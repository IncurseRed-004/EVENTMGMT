import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../Redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const { users } = useSelector((state) => state.userState);

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
        return <h3>User not found</h3>;
    }

    const schema = yup.object().shape({
        fullname: yup.string().required("Full name required"),
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email required"),
        password: yup.string().required("Password required"),
    });

    const handleEditUser = (values) => {
        values.id = Number(id);
        values.role = user.role;
        values.status = user.status;

        dispatch(editUser(values));

        toast.success("User updated successfully!");

        navigate("/list-users");
    };

    return (
        <Container className="min-vh-100 d-flex justify-content-center align-items-center">

            <Row className="justify-content-center">

                <Col md={4} className="w-100">

                    <Row>
                        <Col>
                            <h4>Edit User</h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col>

                            <Formik
                                validationSchema={schema}
                                onSubmit={handleEditUser}
                                initialValues={{
                                    fullname: user.fullname,
                                    email: user.email,
                                    password: user.password,
                                }}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    touched,
                                    errors,
                                }) => (

                                    <Form noValidate onSubmit={handleSubmit}>

                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Full Name</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    name="fullname"
                                                    value={values.fullname}
                                                    onChange={handleChange}
                                                    isValid={touched.fullname && !errors.fullname}
                                                    isInvalid={touched.fullname && !!errors.fullname}
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.fullname}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Email</Form.Label>

                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isValid={touched.email && !errors.email}
                                                    isInvalid={touched.email && !!errors.email}
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-4">
                                            <Form.Group as={Col}>
                                                <Form.Label>Password</Form.Label>

                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isValid={touched.password && !errors.password}
                                                    isInvalid={touched.password && !!errors.password}
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

                                        <div className="d-grid">
                                            <Button type="submit">
                                                Update User
                                            </Button>
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
}

export default EditUser;