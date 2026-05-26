import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./Loginpage.css"
import { Link } from "react-router-dom";

function Loginpage() {
    const navigate = useNavigate()
    const formik = useFormik({

        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmpassword: ""
        },

        validationSchema: yup.object({
            name: yup.string().required("name is required"),
            email: yup.string().email("invalid email").required("email is required"),
            password: yup.string()
                .min(8, "password must be at least 8 characters")
                .required("password is required")
                .matches(/[A-Z]/, "password must contain at least one uppercase letter")
                .matches(/[a-z]/, "password must contain at least one lowercase letter")
                .matches(/[0-9]/, "password must contain at least one number")
                .matches(/[@$!%*?&]/, "password must contain at least one special character"),

            confirmpassword: yup.string()
                .oneOf([yup.ref("password"), null], "passwords must match")
                .required("confirm password is required")
        }),

        onSubmit: (values) => {
            alert("form submitted successfully");
            navigate("/");
        }
    })

    return (
        <>
            <div className="login-container">

                <form onSubmit={formik.handleSubmit}>
                    <h2>Create Account</h2>

                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name &&
                        <div className="text-danger">{formik.errors.name}</div>}

                    <label htmlFor="email">email:</label>
                    <input type="email" name="email" placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div className="text-danger">{formik.errors.email}</div>}


                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <div className="text-danger">{formik.errors.password}</div>}

                    <label htmlFor="confirmpassword">confirmpassword:</label>
                    <input type="password" name="confirmpassword"
                        placeholder="confirmpassword"
                        value={formik.values.confirmpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmpassword && formik.errors.confirmpassword &&
                        <div className="text-danger">
                            {formik.errors.confirmpassword}</div>}

                    <Button type="submit"
                    variant="dark"
                    >Submit</Button>

                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Register here
                        </Link>
                    </p>
                </form>

            </div>
        </>
    )

}
export default Loginpage;