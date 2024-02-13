import { extendTheme } from "@chakra-ui/react";
import colors from './colors';

const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Poppins', sans-serif`,
  }
});

export default theme;