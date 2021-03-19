module.exports = {
    clearMocks: true,
    setupFilesAfterEnv: ['regenerator-runtime/runtime'],
    testPathIgnorePatterns: [
      "/node_modules/",
    ],
    "preset": "@shelf/jest-mongodb",
    "testEnvironment": "node"
  };