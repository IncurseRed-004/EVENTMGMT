import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { changeUserRole, deleteUser, toggleUserStatus } from "../Redux/userSlice";

const ListUsers = () => {
    const { users } = useSelector((state) => state.userState);//to access redux store
    const [show, setShow] = useState(false); //modal
    const dispatch = useDispatch();
    const [deleteUserId, setDeleteUserId] = useState(null);


    const handleClose = () => setShow(false);
    const handleShow = (userId) => {
        setDeleteUserId(userId);
        setShow(true);
    }

    const handleUserDelete = () => {
        dispatch(deleteUser(deleteUserId));
        toast.success("User deleted");
        handleClose();
    }

    const handleStatusChange = (id) => {
        dispatch(toggleUserStatus(id));
    };

    const handleUserRolechange = (payload) => {
        dispatch(changeUserRole(payload))
        toast.success("user role changed !")
    }
    return (

        <Container className="mt-3">
            <Row>
                <Col className="d-flex justify-content-between">
                    <h4>Listed Users</h4>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>email</th>
                                <th>status</th>
                                <th>role</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        {user?.name ?? " "}
                                    </td>
                                    <td>
                                        {user?.email ?? 0}
                                    </td>
                                    <td>
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id={`status-${user.id}`}
                                            checked={user.status}
                                            label={user?.status ? "Active" : "Inactive"}
                                            onChange={() => handleStatusChange(user.id)}
                                        />
                                    </td>
                                    <td>
                                        {/* {user?.role ?? ""} */}
                                        <Form.Select
                                            onChange={(event) => handleUserRolechange({ id: user.id, role: event.target.value })}
                                            defaultValue={user?.role}
                                            aria-label="Default select example">
                                            <option value="user">User</option>
                                            <option value="seller">Seller</option>
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <Link to={`/admin/edit-user/${user.id}`}>
                                            <Button variant="warning" className="me-2">
                                                <MdEdit />
                                            </Button>
                                        </Link>

                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleShow(user.id)}
                                        >
                                            <MdDeleteForever />
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
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure about that !!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUserDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default ListUsers;