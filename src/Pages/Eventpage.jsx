import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./Eventpage.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Eventpage() {
    const events = useSelector((state) => state.eventState.events);
    return (
        <>
            <Container className="mt-5">
                <h2 className="text-center mb-4">Avilable Event</h2>
                <Row>
                    {events.map((event) => (
                        <Col
                            lg={4}
                            md={6}
                            sm={12}
                            className="mb-4"
                            key={event.id}
                        >
                            <Card className="shadow h-100 border-0">
                                <Card.Img
                                    variant="top"
                                    src={event.image}
                                    height="250px"
                                    style={{
                                        objectFit: "cover"
                                    }}
                                />
                                <Card.Body >
                                    <Card.Title>
                                        {event.name}
                                    </Card.Title>

                                    {/* <Card.Text>
                                    {event.description}
                                </Card.Text> */}

                                    <h4>
                                        {event.location}
                                    </h4>

                                    <h5>
                                        ₹ {event.price}
                                    </h5>
                                </Card.Body>
                                <Link to={`/eventdetails/${event.id}`}>
                                    <div className="d-flex justify-content-center mt-4 mb-5">
                                        <Button
                                            variant="dark"
                                            className="mt-auto py-2 cus-button"

                                        >View details</Button>
                                    </div>
                                </Link>
                            </Card>
                        </Col>

                    ))}
                </Row>
            </Container>
        </>
    );
}
export default Eventpage;