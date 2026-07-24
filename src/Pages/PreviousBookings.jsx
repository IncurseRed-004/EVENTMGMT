import React from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

function PreviousBookings() {
    const { user } = useSelector((state) => state.userState)

    const bookings =
        (JSON.parse(localStorage.getItem("bookings")) || []).filter(
            item => item.userId === user.id
        );
    return (
        <Container className="mt-4">
            <Card className="shadow-sm p-3">
                <h4>Previous Bookings</h4>

                {bookings.length === 0 ? (
                    <p className="text-muted mb-0">No bookings yet.</p>
                ) : (
                    <ListGroup variant="flush">
                        {bookings.map((booking, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{booking.name}</strong>
                                <br />
                                ₹{booking.price} × {booking.quantity}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card>
        </Container>
    );
}

export default PreviousBookings;