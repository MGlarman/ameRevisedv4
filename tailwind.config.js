export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#111',
        secondary: '#2f2f2f',
        accent: '#ffdf91',
        hover: '#ffffff',
        border: '#666',
        muted: '#ccc',
      },
    }

  },
  plugins: [],
}

