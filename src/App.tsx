import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import { routes } from "./routes";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <div className="main">
          <Router>
            {Object.keys(routes).map((route) => {
              return (
                <Route path={route} exact>
                  {routes[route]}
                </Route>
              );
            })}
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
