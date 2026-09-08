const plugin = require('tailwindcss/plugin')
const {pxToRem} = require('./utils')

module.exports = plugin(({matchUtilities, addComponents, theme}) => {
  // Base row styles - always included since .mmd-row is used to structure layouts
  addComponents({
    '.mmd-row': {
      '--inline-spacing': pxToRem(8),
      display: "flex",
      flexWrap: "wrap",
      alignItems: "stretch",
      marginInline: "calc(var(--inline-spacing) * -1)",
      rowGap: "1rem",
    },
    '.mmd-row > .mmd-col': {
      flex: `0 0 100%`,
      maxWidth: '100%',
      paddingInline: "var(--inline-spacing)",
    },
  })

  // Dynamically generate simple grid layouts when used
  matchUtilities(
    {
      'cols': (value) => ({
        '& > .mmd-col': {
          flex: `0 0 calc(100% / ${value})`,
          maxWidth: `calc(100% / ${value})`,
        },
      }),
    },
    {
      values: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
    }
  )

  // Dynamically generate complex grid layouts when used
  matchUtilities(
    {
      'cols': (value) => {
        const [first, second] = value.split('-')
        return {
          '& > .mmd-col:nth-child(odd)': {
            flex: `0 0 ${first}%`,
            maxWidth: `${first}%`,
          },
          '& > .mmd-col:nth-child(even)': {
            flex: `0 0 ${second}%`,
            maxWidth: `${second}%`,
          },
        }
      },
    },
    {
      values: {
        '40-60': '40-60',
        '60-40': '60-40',
        '30-70': '30-70',
        '70-30': '70-30',
        '20-80': '20-80',
        '80-20': '80-20'
      },
    }
  )

  // Dynamically generate row spacing only when used
  matchUtilities(
    {
      'mmd-row': (value) => ({
        [`@media (min-width: ${pxToRem(992)})`]: {
          '--inline-spacing': pxToRem(value),
        }
      }),
    },
    {
      values: {
        sm: '8',
        md: '12',
        lg: '30',
        xl: '28.5',
        "2xl": '44'
      },
    }
  )
})