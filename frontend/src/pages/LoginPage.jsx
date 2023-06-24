import apiCaller from "../services/apiCaller";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFormik, useField, Form } from "formik";
import * as Yup from "yup";
import { redirect, useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const Form = () => {
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Email address are required!")
          .email("Email address must be a valid email"),
        password: Yup.string()
          .required("Password are required!")
          .min(7, "Password Minimum 7 Character"),
      }),
      onSubmit: async (values) => {
        apiCaller
          .post("/login", values)
          .then((res) => {
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);

            if (res.data.role == 0) {
              navigate("/admin/dashboard");
            } else {
              navigate("/dashboard");
            }
          })
          .catch((err) => {
            Swal.fire("Failed", err.response.data.msg, "error");
          });
      },
    });

    return (
      <>
        <form onSubmit={formik.handleSubmit}>
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
          to={`/register`}
          style={{
            borderRadius: 15,
            paddingRight: 10,
            textDecoration: "none",
          }}
        >
          Dont have account? Register here
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

export default LoginPage;
