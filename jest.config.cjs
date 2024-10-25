module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  resolver: undefined,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
