import apiCaller from "../services/apiCaller";
import Swal from "sweetalert2";
import { useState } from "react";
import { useFormik, useField, Form } from "formik";
import * as Yup from "yup";
import { redirect, useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const Form = () => {
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
        name: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Email address are required!")
          .email("Email address must be a valid email"),
        password: Yup.string()
          .required("Password are required!")
          .min(7, "Password Minimum 7 Character"),
        name: Yup.string().required("Name are required!"),
      }),
      onSubmit: async (values) => {
        values["role"] = 1;
        apiCaller
          .post("/register", values)
          .then((res) => {
            console.log(res);
            Swal.fire(
              "Success",
              "Register Success, Please Login",
              "success"
            ).then(() => navigate("/"));
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Failed", err.response.data.errors[0].message, "error");
          });
      },
    });

    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <label class="form-label" for="name">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
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
            <label class="form-label" for="email">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              id="email"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-outline mb-4">
            <label class="form-label" for="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              id="password"
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <button className={`btn btn-primary btn-lg btn-block`} type="submit">
            Login
          </button>
        </form>
        <Link
          to={`/`}
          style={{
            borderRadius: 15,
            paddingRight: 10,
            textDecoration: "none",
          }}
        >
          Already have account? Login here
        </Link>
      </>
    );
  };

  return (
    <>
      <div className="d-flex align-items-center min-vh-100">
        <div className="container text-center" style={{ width: "500px" }}>
          {Form()}
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
