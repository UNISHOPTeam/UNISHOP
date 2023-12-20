module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset'
  // ],
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        useBuiltIns: "entry",
        polyfills: ["es.promise", "es.symbol", "es.object.assign"],
        corejs: { version: 3, proposals: true },
      },
    ],
  ],
  plugins: [ "@babel/plugin-transform-runtime",
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
    ],
  ],
}
