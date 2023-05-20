module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.(spec|test).ts'],

  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],

  clearMocks: true,
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,

  silent: false,
  verbose: true,
};
