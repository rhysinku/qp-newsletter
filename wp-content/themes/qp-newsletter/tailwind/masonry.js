const plugin = require('tailwindcss/plugin')

module.exports = plugin(({matchUtilities, addComponents}) => {
  // Base masonry container
  addComponents({
    '.mmd-masonry': {
      '--masonry-gutter': '8px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.mmd-masonry-gutter': {
      maxWidth: `var(--masonry-gutter)`,
      width: '100%',
    },
  })

  // Column count
  matchUtilities(
    {
      masonry: (value) => ({
        '& > .mmd-masonry-col': {
          maxWidth: `calc((100% / ${value}) - var(--masonry-gutter))`,
          flexBasis: `calc((100% / ${value}) - var(--masonry-gutter))`,
          marginBottom: `var(--masonry-gutter)`,
          width: '100%', // to maintain full width
        },
      }),
    },
    {values: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6}}
  )

  // Gutter spacing (applied to the container) - FIXED
  matchUtilities(
    {
      'masonry-gutter': (value) => ({
        '--masonry-gutter': value, // Remove the template literal and px suffix
      }),
    },
    {
      values: {
        sm: '8px',   // Include px unit in the value
        md: '24px',  // Include px unit in the value
        lg: '46px'   // Include px unit in the value
      }
    }
  )
})
