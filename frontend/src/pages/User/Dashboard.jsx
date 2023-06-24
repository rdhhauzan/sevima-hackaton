import { useEffect, useState } from "react";
import apiCaller from "../../services/apiCaller";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import UserNavbar from "../../Components/UserNavbar";
import { AiOutlineClockCircle, AiOutlineQuestion } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

function UserDashboard() {
  let navigate = useNavigate();
  let [Quiz, setQuiz] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [totalScore, setTotalScore] = useState(0);

  async function fetchAllQuiz() {
    await apiCaller
      .get("/quizzes", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const quizzes = res.data;

        apiCaller
          .get("/users/profile", {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          })
          .then((res2) => {
            const quizResults = res2.data.userProfile.quizResults;

            // Merge the results and add the `answered` field
            const mergedResults = quizzes.map((quiz) => {
              const matchingResult = quizResults.find(
                (result) => result.quizId === quiz.id
              );

              if (matchingResult) {
                return {
                  ...quiz,
                  answered: true,
                  score: matchingResult.score,
                };
              } else {
                return {
                  ...quiz,
                  answered: false,
                };
              }
            });

            console.log(mergedResults);
            setQuiz(mergedResults);

            const totalScore = quizResults.reduce(
              (acc, result) => acc + result.score,
              0
            );
            setTotalScore(totalScore);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function goToQuiz(id) {
    navigate(`/quiz/${id}`);
  }

  useEffect(() => {
    fetchAllQuiz();
  }, []);

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
        <UserNavbar />
        <div className="mt-3">
          <div className="row">
            <div className="col-md-3">
              <div
                className="border p-3 rounded"
                style={{ backgroundColor: "white" }}
              >
                <h4>Account Name</h4>
                <p style={{ fontSize: "18px" }}>
                  {localStorage.getItem("name")}
                </p>
                <h4>Total Score</h4>
                <p style={{ fontSize: "18px" }}>{totalScore}</p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                {Quiz.map((data, i) => {
                  return (
                    <>
                      <div className="col-md-6 my-1">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{data.name}</h5>
                            <div className="card-text">
                              <p>{data.description}</p>
                              <div className="row">
                                <div className="col">
                                  <div className="">
                                    <AiOutlineClockCircle /> {data.duration}{" "}
                                    Minutes
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="">
                                    <BsFillPersonFill /> {data.User.name}{" "}
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="">
                                    <AiOutlineQuestion /> {data.totalQuestions}{" "}
                                    Questions
                                  </div>
                                </div>
                              </div>
                              {data.answered ? (
                                <>
                                  <button
                                    className="btn btn-danger m-3"
                                    disabled
                                  >
                                    Score: {data.score}
                                  </button>
                                  <button
                                    className="btn btn-danger m-3"
                                    disabled
                                  >
                                    {data.score >= 0 && data.score <= 30 && "D"}
                                    {data.score >= 31 &&
                                      data.score <= 50 &&
                                      "C"}
                                    {data.score >= 51 &&
                                      data.score <= 80 &&
                                      "B"}
                                    {data.score >= 81 &&
                                      data.score <= 100 &&
                                      "A"}
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className={`btn mt-3 ${
                                      data.totalQuestions < 1
                                        ? "disabled btn-warning"
                                        : "btn-primary"
                                    }`}
                                    onClick={() => goToQuiz(data.id)}
                                  >
                                    {data.totalQuestions < 1
                                      ? "Not Enough Questions"
                                      : "Start Quiz"}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
