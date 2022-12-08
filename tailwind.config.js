module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html.js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  plugins: [
    require("tw-elements/dist/plugin")
  ]
}
