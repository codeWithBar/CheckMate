import { createBrowserRouter } from "react-router-dom";
import PlayRandomMoveEngine from "../components/PlayRandomMoveEngine";
import HomePage from "../components/HomePage";
import OfflineChess from "../components/OfflineChess";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/easyengine", element: <PlayRandomMoveEngine /> },
  { path: "/offline", element: <OfflineChess /> },
]);

export default router;
