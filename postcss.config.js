module.exports = {
  plugins: [
    require("tailwindcss")("./src/tailwind.config.js"),
    {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  ]
}