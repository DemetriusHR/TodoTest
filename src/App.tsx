import React from 'react';
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import TodosPage from "./Pages/Todos/index";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosPage />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
