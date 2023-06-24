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
    loader: () => {
      if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("role") == 0
      ) {
        return redirect("/admin/dashboard");
      } else if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("role") == 1
      ) {
        return redirect("/dashboard");
      }
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("role") == 0
      ) {
        return redirect("/admin/dashboard");
      } else if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("role") == 1
      ) {
        return redirect("/dashboard");
      }
    },
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    loader: () => {
      if (
        localStorage.getItem("role") != 0 &&
        localStorage.getItem("access_token")
      ) {
        return redirect("/dashboard");
      } else if (!localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/admin/edit/quiz",
    element: <EditQuiz />,
    loader: () => {
      if (
        localStorage.getItem("role") != 0 &&
        localStorage.getItem("access_token")
      ) {
        return redirect("/dashboard");
      } else if (!localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/admin/quiz/detail",
    element: <DetailQuiz />,
    loader: () => {
      if (
        localStorage.getItem("role") != 0 &&
        localStorage.getItem("access_token")
      ) {
        return redirect("/dashboard");
      } else if (!localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/admin/quiz/add",
    element: <AddQuiz />,
    loader: () => {
      if (
        localStorage.getItem("role") != 0 &&
        localStorage.getItem("access_token")
      ) {
        return redirect("/dashboard");
      } else if (!localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/admin/quizzes",
    element: <ShowQuiz />,
    loader: () => {
      if (
        localStorage.getItem("role") != 0 &&
        localStorage.getItem("access_token")
      ) {
        return redirect("/dashboard");
      } else if (!localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
    loader: () => {
      if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("role") != 1
      ) {
        return redirect("/admin/dashboard");
      } else if (!localStorage.getItem("access_token")) {
        return redirect("/");
      } else {
        return null;
      }
    },
  },
  {
    path: "/quiz/:id",
    element: <QuizPage />,
    loader: () => {
      if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("role") != 1
      ) {
        return redirect("/admin/dashboard");
      } else if (!localStorage.getItem("access_token")) {
        return redirect("/");
      } else {
        return null;
      }
    },
  },
]);

export default router;
