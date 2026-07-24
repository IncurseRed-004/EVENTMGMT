import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./Loginpage.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userLogin } from "../Redux/userSlice";

import { ADMIN } from "../utils/Masteradmin";


function Loginpage() {
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.userState); // to get the users from the state in redux and local storage
    const dispatch = useDispatch();

    console.log("users--------->", users);



    const schema = yup.object().shape({
        email: yup.string()
            .email("invalid email")
            .required("email is required"),
        password: yup.string()
            .required("password is required"),
    });

    const handleLogin = (values) => {

        if (values.email === ADMIN.email && values.password === ADMIN.password) {
            dispatch(userLogin(ADMIN));
            toast.success("Admin login was a grand successssss");
            setTimeout(() => {
                navigate("/");
            }, 1500);

            return;
        }


        const user = users.find((user) => user.email === values.email);// to find the user with the email entered in the form

        if (!user) {
            toast.error("user not found");
            return;
        }
        if (user.password !== values.password) {
            toast.error("invalid password");
            return;
        }
        dispatch(userLogin(user));// to update the state in redux and local storage
        toast.success("login was a grand successssss");
        setTimeout(() => {
            navigate("/")
        }, 1500)


    }

    return (
        <Container className="min-vh-100 d-flex justify-content-center align-items-center">
            <Row className='justify-content-center'>
                <Col md={4} className="w-100">
                    <Row>
                        <Col>
                            <h4>User login</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleLogin}
                                initialValues={{
                                    email: "",
                                    password: ""
                                }}
                            >
                                {({ handleSubmit, handleChange, values, errors, touched }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isValid={touched.email && !errors.email}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.email}
                                                    {/* only show when error occurs */}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>

                                        <Row className='mb-4'>
                                            <Form.Group as={Col} controlId="validationFormik02">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isValid={touched.password && !errors.password}
                                                    isInvalid={touched.password && !!errors.password}
                                                />

                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.password}
                                                    {/* only show when error occurs */}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

                                        <div className='d-grid'>
                                            <Button type="submit">Login</Button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-3 text-center'>
                            if you don't have an account ,<Link to={"/register"}>Register Now</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    );
}

export default Loginpage;