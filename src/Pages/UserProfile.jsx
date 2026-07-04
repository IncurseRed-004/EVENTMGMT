import React, { useState } from "react";
import { Card,Col,Container,Image,Row,Form,Button,Badge} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../Redux/userSlice";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";


const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.userState);

    const [fullname, setFullname] = useState(user?.fullname || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState(user?.password || "");

    const [profilePhoto, setProfilePhoto] = useState(
        user?.profilePhoto ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    );

    if (!user) {
        return (
            <Container className="mt-5">
                <h3 className="text-center">Please Login First</h3>
            </Container>
        );
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfilePhoto(imageURL);
        }
    };

    const handleUpdate = () => {
        const updatedUser = {
            ...user,
            fullname,
            email,
            password,
            profilePhoto,
        };

        dispatch(editUser(updatedUser));
        toast.success("Profile Updated Successfully");
        navigate("/");
    };

    return (
        <Container className="profile-page">
            <Card className="profile-card">

                <div className="profile-banner"></div>

                <div className="profile-image-wrapper">
                    <Image
                        src={profilePhoto}
                        roundedCircle
                        className="profile-image"
                    />

                    <label htmlFor="profileUpload" className="camera-btn">
                        <FaCamera />
                    </label>

                    <Form.Control
                        id="profileUpload"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handlePhotoChange}
                    />
                </div>

                <Card.Body>

                    <div className="text-center mb-4">
                        <Badge
                            bg={
                                user.role === "admin"
                                    ? "danger"
                                    : user.role === "seller"
                                        ? "warning"
                                        : "primary"
                            }
                        >
                            {user.role.toUpperCase()}
                        </Badge>
                    </div>

                    <Row className="g-3">

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={user.status ? "🟢 Active" : "🔴 Inactive"}
                                    disabled
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                    <div className="text-center mt-4">
                        <Button
                            variant="dark"
                            onClick={handleUpdate}
                        >
                            Update Profile
                        </Button>
                    </div>

                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserProfile;