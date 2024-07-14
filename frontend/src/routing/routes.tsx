import { createBrowserRouter } from "react-router-dom";
import PlayRandomMoveEngine from "../PlayRandomMoveEngine";

const router = createBrowserRouter([
  { path: "/easyengine", element: <PlayRandomMoveEngine /> },
]);

export default router;
