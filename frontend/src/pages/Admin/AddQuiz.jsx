import apiCaller from "../../services/apiCaller";
import AdminNavbar from "../../Components/AdminNavbar";
import Swal from "sweetalert2";
import { useFormik, useField, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

function AddQuiz() {
  const navigate = useNavigate();

  function Form() {
    const formik = useFormik({
      initialValues: {
        name: "",
        description: "",
        duration: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        duration: Yup.number()
          .integer("Duration must be an integer")
          .required("Duration is required")
          .test("is-integer", "Duration must be an integer", (value) =>
            Number.isInteger(value)
          ),
      }),
      onSubmit: (values) => {
        apiCaller
          .post("/admin/quizzes", values, {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Quiz added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/admin/quizzes");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      },
    });

    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <label class="form-label" for="name">
              Quiz Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              id="name"
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form-outline mb-4">
            <label class="form-label" for="description">
              Quiz Description
            </label>
            <textarea
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              id="description"
            />

            {formik.touched.description && formik.errors.description ? (
              <div className="text-danger">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="form-outline mb-4">
            <label class="form-label" for="name">
              Quiz Duration
            </label>
            <input
              type="number"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.duration}
              id="duration"
            />

            {formik.touched.duration && formik.errors.duration ? (
              <div className="text-danger">{formik.errors.duration}</div>
            ) : null}
          </div>

          <button className={`btn btn-primary btn-lg btn-block`} type="submit">
            Edit
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <AdminNavbar />
        <div className="mt-3">{Form()}</div>
      </div>
    </>
  );
}

export default AddQuiz;
