module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^UI/(.*)$': '<rootDir>/src/UI/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^auth/(.*)$': '<rootDir>/src/auth/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js',
  },
  transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)',
    ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
};