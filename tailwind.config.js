module.exports = {
  content: [
        // Add paths to all template files using Tailwind classes
        './rainyExtension/index.html',
        // './rainyExtension/index2.html', // If used
        // './rainyExtension/index3.html', // If used
        './src/*.js',               // Include your source JS files
        './src/*.jsx',              // Include JSX if your React components use it
      ],
      
      // './src/**/*.{js,jsx,ts,tsx}', './rainyExtension/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
}