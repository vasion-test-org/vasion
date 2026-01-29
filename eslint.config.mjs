import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierConfig from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  // Base JS recommended rules
  js.configs.recommended,

  // Prettier config (disables conflicting rules)
  prettierConfig,

  // Perfectionist plugin for sorting
  {
    plugins: {
      perfectionist,
    },
    rules: {
      // Import sorting
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'type',
            'react',
            'next',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              react: ['^react$', '^react-.*'],
              next: ['^next$', '^next/.*', '^@next/.*'],
            },
            type: {
              react: ['^react$', '^react-.*'],
              next: ['^next$', '^next/.*'],
            },
          },
          newlinesBetween: 'always',
          internalPattern: ['^@/.*', '^~/.*'],
        },
      ],
      // Named export sorting
      'perfectionist/sort-named-exports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      // Named import sorting
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      // Switch case sorting
      'perfectionist/sort-switch-case': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      // Object keys sorting (optional, can be strict)
      'perfectionist/sort-objects': [
        'warn',
        {
          type: 'natural',
          order: 'asc',
          partitionByComment: true,
        },
      ],
      // Interface/type sorting
      'perfectionist/sort-interfaces': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      // JSX props sorting
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['shorthand', 'unknown', 'multiline', 'callback'],
        },
      ],
    },
  },

  // JSX Accessibility rules
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // Images must have alt text
      'jsx-a11y/alt-text': 'error',
      // Anchors must have content
      'jsx-a11y/anchor-has-content': 'error',
      // Anchors must be valid
      'jsx-a11y/anchor-is-valid': 'warn',
      // ARIA props must be valid
      'jsx-a11y/aria-props': 'error',
      // ARIA state and property values must be valid
      'jsx-a11y/aria-proptypes': 'error',
      // ARIA roles must be valid
      'jsx-a11y/aria-role': 'error',
      // Elements with ARIA roles must have required attributes
      'jsx-a11y/role-has-required-aria-props': 'error',
      // Interactive elements must be focusable
      'jsx-a11y/interactive-supports-focus': 'error',
      // Labels must have associated control
      'jsx-a11y/label-has-associated-control': 'error',
      // Media must have captions
      'jsx-a11y/media-has-caption': 'warn',
      // No autofocus
      'jsx-a11y/no-autofocus': 'warn',
      // No redundant roles
      'jsx-a11y/no-redundant-roles': 'error',
      // Tabindex no positive
      'jsx-a11y/tabindex-no-positive': 'error',
      // Click events must have key events
      'jsx-a11y/click-events-have-key-events': 'warn',
      // No static element interactions without role
      'jsx-a11y/no-static-element-interactions': 'warn',
      // Headings must have content
      'jsx-a11y/heading-has-content': 'error',
    },
  },

  // Next.js rules
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Unused imports detection and auto-removal
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Auto-remove unused imports on fix
      'unused-imports/no-unused-imports': 'error',
      // Detect unused variables (works with imports)
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Global settings
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        MutationObserver: 'readonly',
        // Node globals
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
      },
    },
    rules: {
      // General best practices
      'no-console': 'warn',
      // Disabled in favor of unused-imports plugin
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // File patterns
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'public/**',
      '*.config.js',
      '*.config.mjs',
      'sb-scripts/**',
    ],
  },
];
