import * as formik from 'formik';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { addEvent, editEvent } from '../Redux/eventSlice';

function Editevents() {
    const { Formik } = formik;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //to access the events from events from event state
    const { id } = useParams();
    const { events } = useSelector((state) => state.eventState);
    const event = events.find((event) => event.id === Number(id));
    if (!event) {
        return <h3>Event not found</h3>;
    }

    const schema = yup.object().shape({
        name: yup.string().required("event name please"),
        location: yup.string().required("enter location"),
        price: yup.number().positive("please enter event price").required("enter price"),
        description: yup.string()
            .required("product description please")
            .min(2, "description should be at least 2 characters"),
        image: yup.string().required("product photo please"),
    });

    const handleAddevents = (values) => {
        values.id = Number(id);
        dispatch(editEvent(values));
        toast.success("the event was added successfully !!!");
        navigate("/list-events");

    }
    


    return (
        
        <Container className='min-vh-100 d-flex justify-content-center align-items-center'>
            {event && (

                <Row className='justify-content-center'>
                    <Col md={4} className="w-100">
                        <Row>
                            <Col>
                                <h4>edit Events</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <Formik
                                    validationSchema={schema}
                                    onSubmit={handleAddevents}
                                    initialValues={{
                                        name: event.name,
                                        location: event.location,
                                        price: event.price,
                                        description: event.description,
                                        image: event.image

                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                        
                                        <>
                                        
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="validationFormik01">
                                                    <Form.Label>Event</Form.Label>
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
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="location"
                                                        value={values.location}
                                                        onChange={handleChange}
                                                        isValid={touched.location && !errors.location}
                                                        isInvalid={touched.location && !!errors.location}
                                                    />
                                                    <Form.Control.Feedback type='invalid'>
                                                        {errors.location}
                                                        {/* only show when error occurs */}
                                                    </Form.Control.Feedback>

                                                </Form.Group>
                                            </Row>
                                            <Row className='mb-4'>
                                                <Form.Group as={Col} controlId="validationFormik02">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="price"
                                                        value={values.price}
                                                        onChange={handleChange}
                                                        isValid={touched.price && !errors.price}
                                                        isInvalid={touched.price && !!errors.price}
                                                    />

                                                    <Form.Control.Feedback type='invalid'>
                                                        {errors.price}
                                                        {/* only show when error occurs */}
                                                    </Form.Control.Feedback>

                                                </Form.Group>
                                            </Row>
                                            <Row className='mb-4'>
                                                <Form.Group as={Col} controlId="validationFormik02">
                                                    <Form.Label>Event Description</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={5}
                                                        name="description"
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        isValid={touched.description && !errors.description}
                                                        isInvalid={touched.description && !!errors.description}
                                                    />

                                                    <Form.Control.Feedback type='invalid'>
                                                        {errors.description}
                                                        {/* only show when error occurs */}
                                                    </Form.Control.Feedback>

                                                </Form.Group>
                                            </Row>

                                            <Row className='mb-4'>
                                                <Form.Group as={Col} controlId="validationFormik02">
                                                    <Form.Label>Event Photo</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        name="image"
                                                        value={values.image}
                                                        onChange={handleChange}
                                                        isValid={touched.image && !errors.image}
                                                        isInvalid={touched.image && !!errors.image}
                                                    />

                                                    <Form.Control.Feedback type='invalid'>
                                                        {errors.image}
                                                        {/* only show when error occurs */}
                                                    </Form.Control.Feedback>

                                                </Form.Group>
                                            </Row>

                                            <div className='d-grid'>
                                                <Button type="submit">Update Event</Button>
                                            </div>
                                        </Form>
                                        </>
                                    )}
                                </Formik>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </Container>

    );
};

export default Editevents;
