module.exports = {
  // presets: [
  //   ['@babel/preset-env', { targets: { node: 'current' } }],
  //   '@babel/preset-typescript',
  //   '@babel/preset-react'
  // ],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
