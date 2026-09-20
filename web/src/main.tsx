import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./app/router";
import { ContentProvider } from "./content/ContentProvider";
import "./styles/tokens.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ContentProvider>
        <RouterProvider router={router} />
      </ContentProvider>
    </HelmetProvider>
  </StrictMode>
);
