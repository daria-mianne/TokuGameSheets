// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
    ignores: ['*/dist', '*/node_modules', '.jj', 'server/src/db/migrations', 'server/src/db/seeders'],
});
