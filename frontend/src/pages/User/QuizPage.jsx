import { useEffect, useState } from "react";
import apiCaller from "../../services/apiCaller";
import { useNavigate, useParams } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import UserNavbar from "../../Components/UserNavbar";
import Countdown from "./Countdown"; // Import the separate Countdown component
import Swal from "sweetalert2";

function QuizPage() {
  let navigate = useNavigate();
  let { id } = useParams();
  let [isLoading, setIsLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedChoice, setSelectedChoice] = useState(null);

  async function fetchQuestion() {
    await apiCaller
      .get(`quizzes/${id}/questions`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setQuizData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setFormData((prevFormData) => {
      if (prevFormData && prevFormData.length > 0) {
        return [
          ...prevFormData,
          { questionId: questionId, userAnswer: selectedAnswer },
        ];
      } else {
        return [{ questionId: questionId, userAnswer: selectedAnswer }];
      }
    });
    setSelectedChoice(selectedAnswer);
  };

  const handleNextQuestion = () => {
    console.log(currentQuestionIndex, quizData);
    if (currentQuestionIndex < quizData["questions"].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Logic to finish the quiz
      console.log(formData);
      finishQuiz();
    }
  };

  async function finishQuiz() {
    await apiCaller
      .post(
        `quizzes/${id}/answers`,
        { answers: formData },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        Swal.fire(
          "Success",
          "Quiz Finished!, Calculating Score..., redirect back to your dashboard to see your score",
          "success"
        ).then(() => navigate("/dashboard"));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (isLoading || quizData.length === 0) {
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

  const currentQuestion = quizData["questions"][currentQuestionIndex];

  return (
    <>
      <div className="container">
        <UserNavbar />
        <div className="mt-3">
          {/* Pass the remaining time as a prop */}
          <Countdown duration={quizData.duration} onFinish={finishQuiz} />
          <h3>{currentQuestion.question}</h3>
          {currentQuestion.choices.map((choice, index) => (
            <div key={index} className="my-2">
              <button
                onClick={() => handleAnswerSelect(currentQuestion.id, choice)}
                className={`btn ${
                  selectedChoice === choice ? "btn-warning" : "btn-secondary"
                }`}
              >
                {choice}
              </button>
            </div>
          ))}

          <button className="btn btn-primary" onClick={handleNextQuestion}>
            {currentQuestionIndex < quizData["questions"].length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        </div>
      </div>
    </>
  );
}

export default QuizPage;
