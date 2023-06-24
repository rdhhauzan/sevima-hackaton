import Swal from "sweetalert2";
import { useFormik, useField, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate, Link } from "react-router-dom";
import apiCaller from "../../services/apiCaller";

function EditQuiz() {
  let { state } = useLocation();
  let navigate = useNavigate();
  console.log(state);
  function Form() {
    const formik = useFormik({
      initialValues: {
        name: state.name,
        description: state.description,
        duration: state.duration,
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
      onSubmit: async (values) => {
        await apiCaller
          .put(`/admin/quizzes/${state.id}`, values, {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          })
          .then(() => {
            Swal.fire("Success", "Update Success", "success").then(() =>
              navigate("/admin/dashboard")
            );
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
              <div classdescription="text-danger">
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
              <div classduration="text-danger">{formik.errors.duration}</div>
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
      <div className="container mt-4">{Form()}</div>
    </>
  );
}

export default EditQuiz;
