import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

const DEV_ENV = false;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact({
            babel: {
                plugins: [DEV_ENV && '@babel/plugin-transform-react-jsx-source'].filter(Boolean),
            },
        }),
    ],
});
