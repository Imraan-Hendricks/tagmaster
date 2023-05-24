module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.(spec|test).ts'],

  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],

  silent: true,
  verbose: true,
};
