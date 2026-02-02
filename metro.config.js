const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.paths = [path.resolve(__dirname, "src")];

module.exports = withNativewind(config, {
  input: './global.css',
  projects: [],
});