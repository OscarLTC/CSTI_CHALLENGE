import { PrimeReactProvider } from "primereact/api";
import { createRoot } from "react-dom/client";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { PrimeReactConfig } from "./config/primereact/primereact.config.ts";

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider value={PrimeReactConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PrimeReactProvider>
);
