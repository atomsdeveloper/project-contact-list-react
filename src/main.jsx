import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

// Styles
import { GlobalStyles } from "./styles/globals";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
)
