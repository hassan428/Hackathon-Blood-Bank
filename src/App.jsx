import "./App.css";
import { Router_app } from "./config/Router_app";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "styled-components";
import theme from "./config/themeConfig";



function App() {

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router_app />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
