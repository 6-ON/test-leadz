import { extendTheme } from '@chakra-ui/react'
import '../../node_modules/@fontsource/open-sans';
import '../../node_modules/@fontsource/raleway';
export const theme = extendTheme({
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Raleway', sans-serif`,
      },
})
