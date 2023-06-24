import apiCaller from "../../services/apiCaller";
import { useState, useEffect } from "react";
import { redirect, useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { MutatingDots } from "react-loader-spinner";
import AdminNavbar from "../../Components/AdminNavbar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import $ from "jquery";
import * as Yup from "yup";

function DetailQuiz() {
  let { state } = useLocation();
  let navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  console.log(state);

  function fetchQuestion() {
    apiCaller
      .get(`/admin/quizzes/${state.id}/questions`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data.QuizQuestions);
        setQuiz(res.data.QuizQuestions);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function showEdit(data) {
    setSelectedQuiz(data);
    console.log(data);
  }

  async function deleteQuiz(data) {
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
        .delete(`/admin/quizzes/${state.id}/questions/${data.id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchQuestion();
        });
    }
  }

  useEffect(() => {
    fetchQuestion();
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
    <>
      <div className="container">
        <AdminNavbar />
        <div className="mt-4">
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
              {quiz.length == 0 ? (
                <>
                  <h2>No Question Found</h2>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addModal"
                  >
                    Add question here
                  </button>
                </>
              ) : (
                <div className="question">
                  <button
                    className="btn btn-primary my-3 d-flex"
                    data-bs-toggle="modal"
                    data-bs-target="#addModal"
                  >
                    Add New Question
                  </button>
                  <div className="row">
                    {quiz.map((data, i) => {
                      return (
                        <div className="col-md-6 my-1">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">{data.question}</h5>
                              <p class="card-text">
                                <div className="row">
                                  <div className="col">
                                    A. <p>{data.choice_1}</p>
                                  </div>
                                  <div className="col">
                                    B. <p>{data.choice_2}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    C. <p>{data.choice_3}</p>
                                  </div>
                                  <div className="col">
                                    D. <p>{data.choice_4}</p>
                                  </div>
                                </div>
                                <p>Correct Answer : {data.correct_answer}</p>
                              </p>
                              <button
                                href="#"
                                class="btn btn-warning mx-2"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                onClick={() => showEdit(data)}
                              >
                                Edit Question
                              </button>
                              <button
                                href="#"
                                class="btn btn-danger mx-2"
                                onClick={() => deleteQuiz(data)}
                              >
                                Delete Question
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="editModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    question: selectedQuiz?.question,
                    choice_1: selectedQuiz?.choice_1,
                    choice_2: selectedQuiz?.choice_2,
                    choice_3: selectedQuiz?.choice_3,
                    choice_4: selectedQuiz.choice_4,
                    correct_answer: selectedQuiz?.correct_answer,
                  }}
                  validationSchema={Yup.object({
                    question: Yup.string().required("Question is required"),
                    choice_1: Yup.string().required("Choice 1 is required"),
                    choice_2: Yup.string().required("Choice 2 is required"),
                    choice_3: Yup.string().required("Choice 3 is required"),
                    choice_4: Yup.string().required("Choice 4 is required"),
                    correct_answer: Yup.string().required(
                      "Correct Answer is required"
                    ),
                  })}
                  onSubmit={async (values) => {
                    console.log(values);
                    await apiCaller
                      .put(
                        `/admin/quizzes/${selectedQuiz.quizId}/questions/${selectedQuiz.id}`,
                        values,
                        {
                          headers: {
                            access_token: localStorage.getItem("access_token"),
                          },
                        }
                      )
                      .then(() => {
                        Swal.fire({
                          icon: "success",
                          title: "Question Updated Successfully",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        fetchQuestion();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  <Form>
                    <div className="form-outline mb-4">
                      <label htmlFor="question">Question</label>
                      <Field
                        id="question"
                        name="question"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="question"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="choice_1">Choice 1</label>
                      <Field
                        id="choice_1"
                        name="choice_1"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="choice_1"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="choice_2">Choice 2</label>
                      <Field
                        id="choice_2"
                        name="choice_2"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="choice_2"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="choice_3">Choice 3</label>
                      <Field
                        id="choice_3"
                        name="choice_3"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="choice_3"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="choice_4">Choice 4</label>
                      <Field
                        id="choice_4"
                        name="choice_4"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="choice_4"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="correct_answer">Correct Answer</label>
                      <p style={{ fontSize: "14px" }}>
                        Note: You need to retype what is the correct answer, for
                        example, if you want to set the correct answer to Choice
                        4 which is "Option D," the correct answer field should
                        also have the value "Option D."
                      </p>
                      <Field
                        id="correct_answer"
                        name="correct_answer"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="correct_answer"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="addModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add Question
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <Formik
                  initialValues={{
                    question: "",
                    choice_1: "",
                    choice_2: "",
                    choice_3: "",
                    choice_4: "",
                    correct_answer: "",
                  }}
                  validationSchema={Yup.object({
                    question: Yup.string().required("Question is required"),
                    choice_1: Yup.string().required("Choice 1 is required"),
                    choice_2: Yup.string().required("Choice 2 is required"),
                    choice_3: Yup.string().required("Choice 3 is required"),
                    choice_4: Yup.string().required("Choice 4 is required"),
                    correct_answer: Yup.string().required(
                      "Correct Answer is required"
                    ),
                  })}
                  onSubmit={async (values) => {
                    await apiCaller
                      .post(`admin/quizzes/${state.id}/questions`, values, {
                        headers: {
                          access_token: localStorage.getItem("access_token"),
                        },
                      })
                      .then(() => {
                        Swal.fire({
                          icon: "success",
                          title: "Question Add Successfully",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        fetchQuestion();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  <Form>
                    <div className="form-outline mb-4">
                      <label htmlFor="question">Question</label>
                      <Field
                        id="question"
                        name="question"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="question"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="choice_1">Choice 1</label>
                      <Field
                        id="choice_1"
                        name="choice_1"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="choice_1"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="choice_2">Choice 2</label>
                      <Field
                        id="choice_2"
                        name="choice_2"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="choice_2"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="choice_3">Choice 3</label>
                      <Field
                        id="choice_3"
                        name="choice_3"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="choice_3"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="choice_4">Choice 4</label>
                      <Field
                        id="choice_4"
                        name="choice_4"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="choice_4"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="correct_answer">Correct Answer</label>
                      <p style={{ fontSize: "14px" }}>
                        Note: You need to retype what is the correct answer, for
                        example, if you want to set the correct answer to Choice
                        4 which is "Option D," the correct answer field should
                        also have the value "Option D."
                      </p>
                      <Field
                        id="correct_answer"
                        name="correct_answer"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="correct_answer"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailQuiz;
