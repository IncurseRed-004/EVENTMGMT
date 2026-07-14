import React from "react";
import { useNavigate } from "react-router-dom";
import * as formik from "formik";
import { useSelector } from "react-redux";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { toast } from "react-toastify";

function CheckoutPage() {
    const { Formik } = formik;
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.eventState);

    const totalPrice = cartItems?.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const schema = yup.object().shape({
        fullName: yup.string().required("Full Name is required"),
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        phone: yup
            .string()
            .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
            .required("Phone Number is required"),
        address: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        pincode: yup
            .string()
            .matches(/^[0-9]{6}$/, "Enter a valid PIN Code")
            .required("PIN Code is required"),
        paymentMethod: yup.string().required("Select a payment method"),
    });

    const handleCheckout = (values) => {
        console.log(values);
        toast.success("Order placed successfully!");
        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <Container className="my-5">
            <Row>
                <Col lg={8}>
                    <Card className="shadow p-4">
                    <h2 className="mb-4">Checkout</h2>

                    <Formik
                        validationSchema={schema}
                        onSubmit={handleCheckout}
                        initialValues={{
                            fullName: "",
                            email: "",
                            phone: "",
                            address: "",
                            city: "",
                            state: "",
                            pincode: "",
                            paymentMethod: "",
                        }}>
                        {({
                            handleSubmit, handleChange, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>

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

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>

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

                                <Form.Group className="mb-3">

                                    <Form.Label>Phone Number</Form.Label>

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

                                <Form.Group className="mb-3">

                                    <Form.Label>Address</Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        isInvalid={touched.address && !!errors.address
                                        }
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Row>

                                    <Col>

                                        <Form.Group className="mb-3">
                                            <Form.Label>City</Form.Label>

                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                isInvalid={touched.city && !!errors.city
                                                }
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.city}
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3">
                                            <Form.Label>State</Form.Label>

                                            <Form.Control
                                                type="text"
                                                name="state"
                                                value={values.state}
                                                onChange={handleChange}
                                                isInvalid={touched.state && !!errors.state
                                                }
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.state}
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Form.Group className="mb-3">

                                    <Form.Label>PIN Code</Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="pincode"
                                        value={values.pincode}
                                        onChange={handleChange}
                                        isInvalid={touched.pincode && !!errors.pincode
                                        }
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.pincode}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <h5 className="mt-4">
                                    Payment Method
                                </h5>

                                <Form.Check
                                    type="radio"
                                    label="Cash on Delivery"
                                    value="COD"
                                    name="paymentMethod"
                                    onChange={handleChange}
                                />

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
                                        Place Order
                                    </Button>

                                </div>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Col>

            <Col lg={4}>

                <Card className="shadow p-4">

                    <h4>Order Summary</h4>

                    <hr />

                    <p>
                        Total Items :
                        <strong> {cartItems.length}</strong>
                    </p>

                    <p>
                        Total Amount :
                        <strong> ₹{totalPrice}</strong>
                    </p>

                </Card>

            </Col>
        </Row>

        </Container >
    );
}

export default CheckoutPage;