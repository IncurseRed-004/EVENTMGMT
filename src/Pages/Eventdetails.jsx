import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../Redux/eventSlice";

function Eventdetails() {
    const { id } = useParams()

    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventState.events);
    const singleevent = events.find(
        (event) => event.id === Number(id)
    )

    const handleAddtoCart = () => {
        if (!singleevent) return;
        dispatch(addCartItem(singleevent));
    };

    return (
        <>
            <div>
                <Container>
                    <Card className="border-0">
                        {singleevent ? (

                            <Row>
                                <Col md={5}>
                                    <Card.Img
                                        src={singleevent?.image ?? null}
                                        style={{
                                            height: "450px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </Col>

                                <Col md={7}>
                                    <Card.Body>
                                        <h2>{singleevent?.name ?? ""}</h2>
                                        <p>{singleevent?.description ?? ""}</p>
                                        <h3>{singleevent?.location ?? ""}</h3>
                                        <h4>{singleevent?.price ?? ""}</h4>

                                        <Button variant="dark"
                                            onClick={handleAddtoCart}>
                                            Book Ticket
                                        </Button>

                                    </Card.Body>
                                </Col>
                            </Row>
                        ) : (
                            <Row>
                                <Col className="text-center">
                                    <h4>event not found</h4>
                                </Col>
                            </Row>
                        )}
                    </Card>


                </Container>
            </div>
        </>
    )
}
export default Eventdetails;