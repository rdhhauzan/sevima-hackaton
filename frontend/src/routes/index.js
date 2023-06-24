import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminDashboard from "../pages/Admin/Dashboard";
import EditQuiz from "../pages/Admin/EditQuiz";
import DetailQuiz from "../pages/Admin/DetailQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/edit/quiz",
    element: <EditQuiz />,
  },
  {
    path: "/admin/quiz/detail",
    element: <DetailQuiz />,
  },
]);

export default router;
