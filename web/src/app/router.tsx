import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/templates/RootLayout";
import { HomePage } from "../pages/HomePage";
import { FranchisePage } from "../pages/FranchisePage";
import { StoreDetailPage } from "../pages/StoreDetailPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "franchise", element: <FranchisePage /> },
      { path: "stores/:slug", element: <StoreDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
