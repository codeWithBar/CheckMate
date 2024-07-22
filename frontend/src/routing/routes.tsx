import { createBrowserRouter } from "react-router-dom";
import PlayVsEngine from "../components/PlayVsEngine";
import HomePage from "../components/HomePage";
import OfflineChess from "../components/OfflineChess";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/engine", element: <PlayVsEngine /> },
  { path: "/offline", element: <OfflineChess /> },
]);

export default router;
