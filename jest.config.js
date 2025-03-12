export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock styles
    '^@/(.*)$': '<rootDir>/src/$1', // Allow '@' imports to resolve to src
    '^@api/(.*)$': '<rootDir>/src/api/$1' // Allow imports from api folder
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};
