import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import svelteConfig from './svelte.config.js'

export default defineConfig([
	globalIgnores(['dist/', 'dist-ssr/', '.svelte-kit/', 'build/', 'coverage/']),
	js.configs.recommended,
	tseslint.configs.recommended,
	svelte.configs.recommended,
	svelte.configs.prettier,
	{
		files: ['src/**/*.{js,ts,svelte}'],
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		files: ['**/*.svelte', '**/*.svelte.{js,ts}'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.svelte'],
				svelteConfig,
			},
		},
	},
	{
		files: ['*.config.{js,ts}', 'vite.config.ts'],
		languageOptions: {
			globals: globals.node,
		},
	},
])
