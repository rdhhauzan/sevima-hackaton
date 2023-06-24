import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminDashboard from "../pages/Admin/Dashboard";
import EditQuiz from "../pages/Admin/EditQuiz";
import DetailQuiz from "../pages/Admin/DetailQuiz";
import AddQuiz from "../pages/Admin/AddQuiz";
import ShowQuiz from "../pages/Admin/ShowQuiz";
import UserDashboard from "../pages/User/Dashboard";
import QuizPage from "../pages/User/QuizPage";


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
  {
    path: "/admin/quiz/add",
    element: <AddQuiz />,
  },
  {
    path: "/admin/quizzes",
    element: <ShowQuiz />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/quiz/:id",
    element: <QuizPage />,
  },
]);

export default router;
