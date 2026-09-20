import { createBrowserRouter } from "react-router-dom";
import { PublicGate } from "./PublicGate";
import { AdminRoute } from "./AdminRoute";
import { HomePage } from "../pages/HomePage";
import { FranchisePage } from "../pages/FranchisePage";
import { StoreDetailPage } from "../pages/StoreDetailPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { HomeEnPage, HomeJaPage } from "../pages/LocalizedHomePage";

export const router = createBrowserRouter([
  // 관리자 화면은 리뉴얼 모드와 무관하게 항상 열린다.
  { path: "/admin", element: <AdminRoute /> },
  {
    path: "/",
    element: <PublicGate />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "en", element: <HomeEnPage /> },
      { path: "ja", element: <HomeJaPage /> },
      { path: "franchise", element: <FranchisePage /> },
      { path: "stores/:slug", element: <StoreDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
