import apiCaller from "../../services/apiCaller";
import { useState, useEffect } from "react";
import { redirect, useNavigate, Link } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import AdminNavbar from "../../Components/AdminNavbar";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import Swal from "sweetalert2";

document.body.style = "background: #F5F6F8";
function AdminDashboard() {
  let [Quiz, setQuiz] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [Users, setUsers] = useState({});
  const [score, setScore] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Quiz);
    fetchQuiz();
    fetchUsers();
    avgScore();
  }, []);

  function fetchQuiz() {
    apiCaller
      .get("/admin/quizzes", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setQuiz(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function fetchUsers() {
    apiCaller
      .get("/admin/users", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUsers(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function avgScore() {
    apiCaller
      .get("/admin/avg/quizzes", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setScore(res.data.averageScore);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  const handleEditClick = (data) => {
    navigate("/admin/edit/quiz", { state: data });
  };

  function handleDelete(id) {
    apiCaller
      .delete(`/admin/quizzes/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        Swal.fire("Success", "Delete Success", "success");
        fetchQuiz();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading) {
    return (
      <div
        className="text-center"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <MutatingDots
          height="500"
          width="500"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <AdminNavbar />
        <div className="mt-3">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6>Total Quizzes</h6>
                  <p className="card-text">
                    {Quiz.length} {Quiz.length < 2 ? "Quiz" : "Quizzes"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6>Total Users</h6>
                  <p className="card-text">
                    {Users.length} {Users.length < 2 ? "User" : "Users"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6>Average Score</h6>
                  <p className="card-text">{score}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rec-quiz mt-3">
            <h2>Recent Quiz</h2>
            <div className="row">
              {Array.isArray(Quiz) ? (
                <>
                  {Quiz.slice(0, 6).map((data, i) => {
                    return (
                      <div className="col-md-4 my-2" key={i}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{data.name}</h5>
                            <div className="card-text mb-3">
                              <p className="">{data.description}</p>
                              <AiOutlineClockCircle /> {
                                data.duration
                              } Minutes <BsFillPersonFill /> {data.User.name}
                            </div>
                            <button
                              href="#"
                              className="btn btn-primary mx-2"
                              onClick={() =>
                                navigate("/admin/quiz/detail", { state: data })
                              }
                            >
                              Detail
                            </button>
                            <button
                              type="button"
                              className="btn btn-warning mx-2"
                              onClick={() => handleEditClick(data)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => handleDelete(data.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
