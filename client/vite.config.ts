import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { URL } from 'node:url';

const DEV_ENV = false;

// https://vitejs.dev/config/
export default defineConfig((env) => {
    const envVars = loadEnv(env.mode, './');

    const serverURL = new URL(process.env.NODE_ENV === 'production'
        ? envVars.VITE_SERVER_URL
        : 'http://localhost:5000'
    );
    const serverAPIPath = process.env.NODE_ENV === 'production'
        ? envVars.VITE_SERVER_API_PATH ?? '/api/v0'
        : ':5000/' + (envVars.VITE_SERVER_API_PATH ?? '/api/v0');

    return {
        envDir: './',
        define: {
            __API_PATH__: JSON.stringify(serverAPIPath),
            __JS_SERVER_URL__: JSON.stringify(serverURL.href),
        },
        build: {
            manifest: true,
            rollupOptions: {
                input: './index.html',
            },
        },
        plugins: [
            preact({
                babel: {
                    plugins: [DEV_ENV && '@babel/plugin-transform-react-jsx-source'].filter(Boolean),
                },
            }),
            tsconfigPaths(),
        ],
        server: {
            allowedHosts: ['tokusheets.rec97.space'],
            cors: {
                origin: 'https://tokusheets.rec97.space',
            },
            port: 5173,
            proxy: {
                [serverAPIPath]: serverURL.origin,
            },
        },
    };
});
