import { StrictMode } from "react";
import App from "./App.jsx";
import { ThemeProvider } from "./common/ThemeContext.jsx";
import { LanguageProvider } from "./i18n";

// Shared by the client (main.jsx) and the build-time prerender
// (entry-server.jsx): both must render the exact same tree to hydrate.
function Root({ language }) {
  return (
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider language={language}>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default Root;
