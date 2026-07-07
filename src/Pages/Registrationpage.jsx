import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userRegister } from '../Redux/userSlice';
import { toast } from 'react-toastify';


function RegisterPage() {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string()
            .required("Name is required"),
        email: yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        role: yup.string()
            .required("Please select a role")

    });

    const handleRegister = (values) => {

        values.id = Date.now();// to generate unique id for each user
        values.status = "true";
        console.log("values-------->", values);
        dispatch(userRegister(values));// to update the state in redux and local storage
        toast.success("registration was a grand successssss");

        setTimeout(() => {
            navigate("/login")
        }, 1500)
    }



    return (
        <Container className='min-vh-100 min- d-flex justify-content-center align-items-center'>
            <Row className='justify-content-center'>
                <Col md={4} className="w-100">
                    <Row>
                        <Col>
                            <h4>User Register</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <Formik
                                validationSchema={schema}
                                onSubmit={handleRegister}
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                    role: "",

                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    isValid={touched.name && !errors.name}
                                                    isInvalid={touched.name && !!errors.name}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.name}
                                                    {/* only show when error occurs */}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

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
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Role</Form.Label>

                                                <Form.Select
                                                    name="role"
                                                    value={values.role}
                                                    onChange={handleChange}
                                                    isInvalid={touched.role && !!errors.role}
                                                    isValid={touched.role && !errors.role}
                                                >
                                                    <option value="">Select Role</option>
                                                    <option value="user">User</option>
                                                    <option value="seller">Seller</option>
                                                    <option value="admin">Admin</option>
                                                </Form.Select>

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.role}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>

                                        <div className='d-grid'>
                                            <Button type="submit">Register</Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

    );
};

export default RegisterPage;