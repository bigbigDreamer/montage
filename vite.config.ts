import { defineConfig } from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
    test: {
        globals: true,
        transformMode: {
            web: [/\.[jt]sx$/],
        },
        setupFiles: './fixtures/vi.setup.ts',
    },
    plugins: [
        AutoImport({
            imports: ['vitest'],
            dts: '.autoImport/ai.d.ts', // generate TypeScript declaration
        }),
    ],
});
