import { useState } from "react";
import { Col, Container, Image, Modal, Row, Table, Button } from "react-bootstrap";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEvent } from "../Redux/eventSlice";




const ListEvents = () => {
    const [show, setShow] = useState(false); //modal
    const [deleteEventIndex, setdeleteEventIndex] = useState(null);
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventState.events);

    const handleClose = () => setShow(false);
    const handleShow = (eventId) => {
        setdeleteEventIndex(eventId)
        setShow(true);

    }
    const handleEventDelete = () => {
        dispatch(deleteEvent(deleteEventIndex));
        toast.success("event was deleted");
        setShow(false);
        setdeleteEventIndex(null);
    }


    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Link className="btn btn-primary" to="/add-events">Add events</Link>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <h4>LIST OF EVENTS</h4>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>event image</th>
                                <th>event name</th>
                                <th>event price</th>
                                <th>event location</th>
                                <th>event description</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events?.map((event, i) => (
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
                                    <td>
                                        {event?.price ?? 0}
                                    </td>
                                    <td>{event?.location ?? ""}</td>
                                    <td>{event?.description ?? ""}</td>
                                    <td>
                                        <Link to={`/edit-events/${event.id}`}>
                                            <MdEdit size={20} />
                                        </Link>
                                    </td>
                                    <td>
                                        <Button onClick={() => handleShow(event.id)}>
                                            <MdDeleteForever size={20} />
                                        </Button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>

                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete events</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure about that !!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEventDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default ListEvents;