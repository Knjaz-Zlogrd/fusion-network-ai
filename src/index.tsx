import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme';
import '@fontsource/montserrat/400.css';
import '@fontsource/poppins/400.css';
import '@fontsource/open-sans/700.css';


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)


