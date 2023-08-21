module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
  daisyui: {
    themes: ["valentine"],
  },
};
