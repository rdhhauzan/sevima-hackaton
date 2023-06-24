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
  let [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuiz();
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
                  <p className="card-text">10</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6>Total Users</h6>
                  <p className="card-text">10</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6>Total Score</h6>
                  <p className="card-text">10</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h6>Average Score</h6>
                  <p className="card-text">10</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rec-quiz mt-3">
            <h2>Recent Quiz</h2>
            <div className="row">
              {Quiz.slice(0, 6).map((data, i) => {
                return (
                  <div className="col-md-4 my-2" key={i}>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{data.name}</h5>
                        <div className="card-text mb-3">
                          <p class="">{data.description}</p>
                          <AiOutlineClockCircle /> {data.duration} Minutes{" "}
                          <BsFillPersonFill /> {data.User.name}
                        </div>
                        <button
                          href="#"
                          class="btn btn-primary mx-2"
                          onClick={() =>
                            navigate("/admin/quiz/detail", { state: data })
                          }
                        >
                          Detail
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning mx-2"
                          onClick={() => handleEditClick(data)}
                        >
                          Update
                        </button>
                        <button
                          class="btn btn-danger mx-2"
                          onClick={() => handleDelete(data.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
