import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const DEV_ENV = false;

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        manifest: true,
        rollupOptions: {
            input: './src/main.tsx',
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
        cors: {
            origin: 'https://tokusheets.rec97.space',
        },
    },
});
