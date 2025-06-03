import { createBrowserRouter } from "react-router-dom";
import { Common } from "../pages/common";


// 라우터 생성
const router = createBrowserRouter([
  { path: "/", element: <Common /> },
]);

// 라우터 내보내기
export default router;