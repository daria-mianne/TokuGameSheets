import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const DEV_ENV = true; // todo: dynamic value

// https://vitejs.dev/config/
export default defineConfig((env) => {
    const envVars = loadEnv(env.mode, './');
    const apiPort = 5000;
    const serverAPIPath = envVars.VITE_SERVER_API_PATH;
    const serverHost = process.env.FROMDOCKER
        ? envVars.DOCKER_API_HOST ?? 'server'
        : 'localhost';

    return {
        envDir: './',
        define: {
            __API_PATH__: JSON.stringify(serverAPIPath),
            __API_PORT__: JSON.stringify(apiPort),
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
            host: true,
            port: 5173,
            proxy: {
                [serverAPIPath]: {
                    target: `http://${serverHost}:${apiPort}`,
                    changeOrigin: true,
                    configure: (proxy) => {
                        if (DEV_ENV) {
                            proxy.on('error', (err) => {
                                console.log('PROXY ERROR', err);
                            });
                            proxy.on('proxyReq', (proxyReq, req) => {
                                console.log('Proxying request to target:', req.method, req.url);
                            });
                            proxy.on('proxyRes', (proxyRes, req) => {
                                console.log('Received response from proxy target:', proxyRes.statusCode, req.url);
                            });
                        }
                    },
                }
            },
        },
    };
});
