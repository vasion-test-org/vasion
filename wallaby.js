module.exports = function (wallaby) {
  return {
    // Source files (non-test files)
    files: [
      "src/**/*.js",
      "src/**/*.jsx",
      "src/**/*.ts",
      "src/**/*.tsx",
      "lib/**/*.js",
      "lib/**/*.ts",
      "utils/**/*.js",
      "utils/**/*.ts",
      "components/**/*.js",
      "components/**/*.jsx",
      "components/**/*.ts",
      "components/**/*.tsx",
      // Exclude test files from source files
      "!src/**/*.test.js",
      "!src/**/*.test.jsx",
      "!src/**/*.test.ts",
      "!src/**/*.test.tsx",
      "!src/**/*.spec.js",
      "!src/**/*.spec.jsx",
      "!src/**/*.spec.ts",
      "!src/**/*.spec.tsx",
      "!**/__tests__/**",
      "!**/node_modules/**",
    ],

    // Test files
    tests: [
      "src/**/*.test.js",
      "src/**/*.test.jsx",
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "src/**/*.spec.js",
      "src/**/*.spec.jsx",
      "src/**/*.spec.ts",
      "src/**/*.spec.tsx",
      "test/**/*.js",
      "test/**/*.ts",
      "__tests__/**/*.js",
      "__tests__/**/*.ts",
      "**/__tests__/**/*.js",
      "**/__tests__/**/*.ts",
    ],

    // Environment configuration
    env: {
      type: "node",
      // Uncomment and adjust if you need specific Node version
      // runner: 'node'
    },

    // Compiler configuration for TypeScript
    compilers: {
      "**/*.ts?(x)": wallaby.compilers.typeScript({
        // TypeScript compiler options
        module: "commonjs",
        target: "es2018",
        jsx: "react-jsx",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        resolveJsonModule: true,
        skipLibCheck: true,
        strict: true,
      }),
    },

    // Test framework setup
    testFramework: "jest",

    // Setup function (runs before tests)
    setup: function (wallaby) {
      // Configure Jest if using it
      if (wallaby.testFramework.jest) {
        const jestConfig = require("./package.json").jest || {};
        wallaby.testFramework.configure(jestConfig);
      }
    },

    // Additional configuration options
    delays: {
      // Delay before running tests after file changes
      run: 300,
    },

    // Worker configuration
    workers: {
      // Number of worker processes
      initial: 1,
      regular: 1,
    },

    // Debug configuration
    debug: false,

    // Report console logs and errors
    reportConsoleErrorAsError: true,

    // Automatically detect if files are related to tests
    autoDetect: true,
  };
};
