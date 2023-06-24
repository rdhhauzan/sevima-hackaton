import apiCaller from "../../services/apiCaller";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import AdminNavbar from "../../Components/AdminNavbar";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import Swal from "sweetalert2";

function ShowQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchAllQuiz() {
    await apiCaller
      .get(`admin/quizzes`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setQuiz(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function deleteQuiz(id) {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      text: "You cannot undo this operation",
      inputValue: 0,
      confirmButtonText: 'Yes <i class="fa fa-arrow-right"></i>',
      showCancelButton: true,
      cancelButtonColor: "red",
    });
    if (confirmDelete.isConfirmed) {
      await apiCaller
        .delete(`/admin/quizzes/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchAllQuiz();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  if (loading) {
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
    <div className="container">
      <AdminNavbar />
      <div className="mt-3">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Quiz Name</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Total Question</th>
              <th scope="col">Created By</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {quiz.map((data, i) => {
              return (
                <>
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.duration} Minutes</td>
                    <td>{data.totalQuestions} Question(s)</td>
                    <td>{data.User.name}</td>
                    <td>
                      <button
                        className="btn btn-primary mx-1"
                        onClick={() =>
                          navigate("/admin/quiz/detail", { state: data })
                        }
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-warning mx-1"
                        onClick={() =>
                          navigate("/admin/edit/quiz", { state: data })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => deleteQuiz(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowQuiz;
