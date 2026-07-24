import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Table, Col, Image, Button, InputGroup, Form } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { cartItemQuantityDecrement, cartItemQuantityIncrement, removeCartItem } from "../Redux/eventSlice";


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.eventState);
    const { user } = useSelector((state) => state.userState);
    const myCart = cartItems.filter(
        (item) => item.userId === user.id
    );

    console.log("My Cart:", myCart);


    const handleItemDecrement = (eventId) => {
        dispatch(cartItemQuantityDecrement({ id: eventId, userId: user.id }))
    }

    const handleItemIncrement = (eventId) => {
        dispatch(cartItemQuantityIncrement({ id: eventId, userId: user.id }))
    }

    const handleRemove = (eventId) => {
        dispatch(removeCartItem({ id: eventId, userId: user.id }))
    }

    const TotalPrice = myCart?.reduce((total, event) => {
        total += event.quantity * event.price;
        return total;
    }, 0)

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Cart Items</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>event image</th>
                                <th>event name</th>
                                <th>event description</th>
                                <th>event price</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCart.map((event, i) => (
                                <tr key={event.id}>

                                    <td>
                                        {1 + i}
                                    </td>
                                    <td>
                                        <Image style={{
                                            width: "150px",
                                            height: "150px"
                                        }}
                                            src={event?.image ?? null}
                                            alt={event?.name ?? " "} />
                                    </td>
                                    <td>
                                        {event?.name}
                                    </td>
                                    <td>{event?.description ?? ""}</td>
                                    <td>
                                        {event?.price ?? 0}
                                    </td>
                                    <td>
                                        <InputGroup
                                            className="mb-3"
                                            style={{ width: "120px" }}>
                                            <Button onClick={() => handleItemDecrement(event.id)}
                                                disabled={event.quantity < 2 ? true : false}
                                                variant="outline-secondary" id="button-addon1">
                                                -
                                            </Button>
                                            <Form.Control
                                                aria-label="Example text with button addon"
                                                aria-describedby="basic-addon1"
                                                value={event.quantity}
                                                readOnly

                                            />
                                            <Button onClick={() => handleItemIncrement(event.id)} variant="outline-success" id="button-addon1">
                                                +
                                            </Button>
                                        </InputGroup>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemove(event.id)}
                                        >
                                            <MdDeleteForever size={20} />
                                        </Button>

                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <td colSpan={7}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="mb-0">
                                            Total: ₹{TotalPrice}
                                        </h4>
                                        <Button
                                            variant="success"
                                            size="lg"
                                            disabled={myCart.length === 0}
                                            onClick={() => navigate("/checkout")}>
                                            Checkout
                                        </Button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
export default Cart;