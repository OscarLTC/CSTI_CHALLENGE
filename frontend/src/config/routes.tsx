import { Navigate, Outlet, type RouteObject } from "react-router";
import { RequestsPage } from "../pages/RequestsPage";
import { RequestFormPage } from "../pages/RequestFormPage";
import { RequestDetailPage } from "../pages/RequestDetailPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/requests" replace />,
  },
  {
    path: "requests",
    element: <Outlet />,
    children: [
      { index: true, element: <RequestsPage /> },
      { path: "new", element: <RequestFormPage /> },
      { path: ":id", element: <RequestDetailPage /> },
      { path: ":id/edit", element: <RequestFormPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/requests" replace />,
  },
];
