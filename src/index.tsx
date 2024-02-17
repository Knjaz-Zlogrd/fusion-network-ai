import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from "./store";
import theme from './theme';
import '@fontsource/montserrat/400.css';
import '@fontsource/poppins/400.css';
import '@fontsource/open-sans/700.css';


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)


