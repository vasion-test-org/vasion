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
          groups: ['shorthand', 'multiline', 'unknown', 'callback'],
          customGroups: {
            callback: '^on[A-Z].*',
          },
        },
      ],
    },
  },

  // JSX Accessibility rules (WCAG 2.1 AA Compliance)
  // This is a comprehensive set aligned with eslint-plugin-jsx-a11y recommended config
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // ========================================
      // PERCEIVABLE (WCAG 1.x)
      // ========================================

      // 1.1.1 Non-text Content
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img', 'area', 'input[type="image"]', 'object'],
          img: ['Image', 'Img'],
          area: [],
          'input[type="image"]': [],
          object: [],
        },
      ],
      // Don't use redundant words in alt text
      'jsx-a11y/img-redundant-alt': [
        'error',
        {
          words: ['image', 'photo', 'picture', 'logo', 'icon'],
        },
      ],

      // 1.2.x Time-based Media
      'jsx-a11y/media-has-caption': [
        'warn',
        {
          audio: ['Audio'],
          video: ['Video', 'ReactPlayer'],
          track: ['Track'],
        },
      ],

      // ========================================
      // OPERABLE (WCAG 2.x)
      // ========================================

      // 2.1.1 Keyboard - All functionality available from keyboard
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': [
        'error',
        {
          handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
          allowExpressionValues: true,
        },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
          handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
        },
      ],
      'jsx-a11y/no-noninteractive-tabindex': [
        'error',
        {
          tags: [],
          roles: ['tabpanel'],
          allowExpressionValues: true,
        },
      ],
      'jsx-a11y/interactive-supports-focus': [
        'error',
        {
          tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
        },
      ],

      // 2.1.4 Character Key Shortcuts - No accesskey (confuses users)
      'jsx-a11y/no-access-key': 'error',

      // 2.4.1 Bypass Blocks
      'jsx-a11y/anchor-has-content': [
        'error',
        {
          components: ['Link', 'NavLink'],
        },
      ],
      'jsx-a11y/anchor-is-valid': [
        'warn',
        {
          components: ['Link', 'NavLink'],
          specialLink: ['to', 'href'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],

      // 2.4.4 Link Purpose
      'jsx-a11y/heading-has-content': [
        'error',
        {
          components: ['Heading', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
        },
      ],

      // 2.4.7 Focus Visible - No positive tabindex
      'jsx-a11y/tabindex-no-positive': 'error',

      // 2.5.3 Label in Name
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label', 'FormLabel'],
          labelAttributes: ['label', 'aria-label'],
          controlComponents: ['Input', 'Select', 'Textarea'],
          assert: 'either',
          depth: 3,
        },
      ],

      // ========================================
      // UNDERSTANDABLE (WCAG 3.x)
      // ========================================

      // 3.2.2 On Input - No autofocus
      'jsx-a11y/no-autofocus': [
        'warn',
        {
          ignoreNonDOM: true,
        },
      ],

      // 3.3.2 Labels or Instructions
      'jsx-a11y/autocomplete-valid': [
        'error',
        {
          inputComponents: ['Input', 'FormInput', 'TextField'],
        },
      ],

      // ========================================
      // ROBUST (WCAG 4.x)
      // ========================================

      // 4.1.1 Parsing - Valid ARIA
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',

      // 4.1.2 Name, Role, Value
      'jsx-a11y/aria-role': [
        'error',
        {
          allowedInvalidRoles: [],
          ignoreNonDOM: true,
        },
      ],
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/no-redundant-roles': [
        'error',
        {
          nav: ['navigation'],
        },
      ],

      // Table-specific
      'jsx-a11y/scope': 'error',

      // Ensure aria-activedescendant is on valid elements
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
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

  // Unused imports detection (disabled auto-removal - styled-components uses may appear unused)
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // DISABLED: Auto-removal causes issues with styled-components and dynamic imports
      'unused-imports/no-unused-imports': 'off',
      // Detect unused variables (warn only, no auto-fix)
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
        Response: 'readonly',
        Request: 'readonly',
        Headers: 'readonly',
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
