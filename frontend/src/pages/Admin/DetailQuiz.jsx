import apiCaller from "../../services/apiCaller";
import { useState, useEffect } from "react";
import { redirect, useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function DetailQuiz() {
  let { state } = useLocation();
  let navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(state);

  function fetchQuestion() {
    apiCaller
      .get(`/admin/quizzes/${state.id}/questions`)
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

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div
              className="border p-3 rounded"
              style={{ backgroundColor: "white" }}
            >
              <h4>Quiz Name</h4>
              <p style={{ fontSize: "18px" }}>{state.name}</p>
              <h4>Quiz Description</h4>
              <p style={{ fontSize: "18px" }}>{state.name}</p>
              <h4>Quiz Duration</h4>
              <p style={{ fontSize: "18px" }}>{state.duration} Minutes </p>
              <h4>Created By</h4>
              <p style={{ fontSize: "18px" }}>{state.User.name} </p>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <h1>asdsafds</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailQuiz;
