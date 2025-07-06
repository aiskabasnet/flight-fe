import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./routes";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AppRoutes />
    </ReactQueryProvider>
  </StrictMode>
);
