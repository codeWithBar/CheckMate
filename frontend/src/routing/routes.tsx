import { createBrowserRouter } from "react-router-dom";
import PlayRandomMoveEngine from "../components/PlayRandomMoveEngine";
import HomePage from "../components/HomePage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/easyengine", element: <PlayRandomMoveEngine /> },
]);

export default router;
