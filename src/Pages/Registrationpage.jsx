import React from "react";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import "./Loginpage.css";

function RegisterPage() {

    const navigate = useNavigate();

    const formik = useFormik({

        initialValues: {
            name: "",
            email: "",
            password: ""
        },

        validationSchema: yup.object({
            name: yup.string()
                .required("Name is required"),
            email: yup.string()
                .email("Invalid email")
                .required("Email is required"),
            password: yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required")

        }),
        onSubmit: (values) => {
            alert("Registration Successful");
            navigate("/login");
        }

    });
    return (
        <>
            <div className="login-container">
                <form onSubmit={formik.handleSubmit}>
                    <h2>Create Account</h2>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.name && formik.errors.name && (
                            <div className="text-danger">
                                {formik.errors.name}
                            </div>
                        )
                    }

                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.email && formik.errors.email && (

                            <div className="text-danger">
                                {formik.errors.email}
                            </div>
                        )
                    }
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {
                        formik.touched.password && formik.errors.password && (
                            <div className="text-danger">
                                {formik.errors.password}
                            </div>
                        )
                    }

                    <Button
                        type="submit"
                        variant="dark"
                    >
                        Register
                    </Button>

                    <p>
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default RegisterPage;