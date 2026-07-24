import React from "react";
import { useNavigate } from "react-router-dom";
import * as formik from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt, FaMobileAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { clearUserCart } from "../Redux/eventSlice";

function CheckoutPage() {
    const { Formik } = formik;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.eventState);
    const { user } = useSelector((state) => state.userState);
    const myCart = cartItems.filter(
        (item) => item.userId === user.id
    );

    console.log(cartItems);
    const totalPrice = myCart?.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const schema = yup.object().shape({
        fullName: yup.string().required("Full Name is required"),

        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),

        phone: yup
            .string()
            .matches(/^[0-9]{10}$/, "Enter a valid phone number")
            .required("Phone Number is required"),

        paymentMethod: yup
            .string()
            .required("Choose a payment method"),
    });

    const handleCheckout = (values) => {
        console.log(values);
        const previousBookings =
            JSON.parse(localStorage.getItem("bookings")) || [];
        localStorage.setItem(
            "bookings",
            JSON.stringify([...previousBookings, ...myCart]));
        dispatch(clearUserCart(user.id));
        toast.success("Order placed successfully!");
        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <Container className="my-5">
            <Row>
                <Col lg={8}>
                    <Card className="shadow-sm border-0 rounded-4 p-4 mb-4">

                        <h4 className="fw-bold mb-3">
                            Events to Book
                        </h4>

                        {myCart.map((event) => (
                            <div
                                key={event.id}
                                className="d-flex justify-content-between border-bottom py-2"
                            >
                                <span>{event.name}</span>
                                <span>x {event.quantity}</span>
                            </div>
                        ))}

                    </Card>

                    <Card className="shadow-sm border-0 rounded-4 p-4">

                        <Formik
                            validationSchema={schema}
                            onSubmit={handleCheckout}
                            initialValues={{
                                fullName: "",
                                email: "",
                                phone: "",
                                paymentMethod: "",
                            }}>
                            {({
                                handleSubmit, handleChange, values, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <FaUser className="me-2" />
                                                    Full Name
                                                </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    name="fullName"
                                                    value={values.fullName}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.fullName && touched.fullName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.fullName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <FaEnvelope className="me-2" />
                                                    Email
                                                </Form.Label>

                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email && touched.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <Row className="mt-3">

                                        <Col>
                                            <Form.Group className="mb-3">

                                                <Form.Label>
                                                    <FaMobileAlt className="me-2" />
                                                    Phone Number
                                                </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    isInvalid={touched.phone && !!errors.phone}
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.phone}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <h5 className="fw-bold mt-5 mb-3">
                                        Choose Payment
                                    </h5>


                                    <Form.Check
                                        type="radio"
                                        label="Credit / Debit Card"
                                        value="Card"
                                        name="paymentMethod"
                                        onChange={handleChange}
                                    />

                                    <Form.Check
                                        type="radio"
                                        label="UPI"
                                        value="UPI"
                                        name="paymentMethod"
                                        onChange={handleChange}
                                    />

                                    <Form.Check
                                        type="radio"
                                        label="Net Banking"
                                        value="Net Banking"
                                        name="paymentMethod"
                                        onChange={handleChange}
                                    />
                                    <p className="text-danger">
                                        {touched.paymentMethod && errors.paymentMethod ? errors.paymentMethod : ""}
                                    </p>

                                    <div className="d-grid mt-4">

                                        <Button type="submit">
                                            Confirm Booking
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card
                        className="shadow-sm border-0 rounded-4 p-4"
                        style={{
                            position: "sticky",
                            top: "90px",
                        }}
                    >
                        <h4 className="fw-bold mb-3">
                            Booking Summary
                        </h4>

                        <hr />

                        <div className="mb-3">

                            <h5 className="fw-semibold">
                                {myCart.map((event) => (
                                    <p key={event.id} className="mb-1">
                                        {event.name}
                                    </p>
                                ))}
                            </h5>

                            <small className="text-muted">
                                {myCart.length} Ticket(s)                            </small>

                        </div>

                        <hr />

                        <div className="d-flex justify-content-between mb-2">
                            <span>Ticket Price</span>
                            <span>₹{totalPrice}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Convenience Fee</span>
                            <span>₹40</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span>GST</span>
                            <span>₹7</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Total</span>
                            <span>₹{totalPrice + 47}</span>
                        </div>


                    </Card>
                </Col>
            </Row>

        </Container >
    );
}

export default CheckoutPage;