module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        lg: '1120px',
        xl: '1280px'
      }
    },

    extend: {
      colors: {
        primary: '#0f172a',      // navy
        secondary: '#2563eb',    // blue
        light: '#f8fafc'
      },

      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.06)'
      }
    }
  },

  safelist: [
    // AG Grid sometimes dynamically adds classes
    'ag-theme-alpine',
    'ag-root-wrapper',
    'ag-header-cell',
    'ag-cell'
  ],

  plugins: []
}
