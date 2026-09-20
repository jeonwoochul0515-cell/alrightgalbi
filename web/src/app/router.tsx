import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/templates/RootLayout";
import { HomePage } from "../pages/HomePage";
import { FranchisePage } from "../pages/FranchisePage";
import { StoreDetailPage } from "../pages/StoreDetailPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { HomeEnPage, HomeJaPage } from "../pages/LocalizedHomePage";
import { MaintenancePage } from "../pages/MaintenancePage";

/** 리뉴얼 공사 스위치 — true면 모든 경로가 리뉴얼 안내만 노출한다. 공개 재개 시 false. */
const MAINTENANCE: boolean = true;

export const router = createBrowserRouter(
  MAINTENANCE
    ? [{ path: "*", element: <MaintenancePage /> }]
    : [
        {
          path: "/",
          element: <RootLayout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: "en", element: <HomeEnPage /> },
            { path: "ja", element: <HomeJaPage /> },
            { path: "franchise", element: <FranchisePage /> },
            { path: "stores/:slug", element: <StoreDetailPage /> },
            { path: "*", element: <NotFoundPage /> },
          ],
        },
      ]
);
