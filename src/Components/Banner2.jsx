import React from "react";
import { Button, Carousel, CarouselCaption, Container } from "react-bootstrap";
import "./Banner.css";

function Banner2() {

    return (
        <>
            <Container className="mt-4 mb-4">

                <Carousel fade>

                    <Carousel.Item>

                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1170&auto=format&fit=crop"
                            alt="Music Festival"
                            height="500px"
                            style={{
                                objectFit: "cover",
                                borderRadius: "16px"
                            }}
                        />

                        <CarouselCaption>

                            <h2>Live Music Festival</h2>

                            <p>
                                Feel the energy of unforgettable live performances
                            </p>

                            <Button className="custom-btn">
                                Explore Events
                            </Button>

                        </CarouselCaption>

                    </Carousel.Item>

                    <Carousel.Item>

                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1170&auto=format&fit=crop"
                            alt="Concert Night"
                            height="500px"
                            style={{
                                objectFit: "cover",
                                borderRadius: "16px"
                            }}
                        />

                        <CarouselCaption>

                            <h2>Concert Nights</h2>

                            <p>
                                Experience electrifying performances and vibrant crowds
                            </p>

                            <Button className="custom-btn">
                                Book Tickets
                            </Button>

                        </CarouselCaption>

                    </Carousel.Item>

                    <Carousel.Item>

                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1170&auto=format&fit=crop"
                            alt="Festival Event"
                            height="500px"
                            style={{
                                objectFit: "cover",
                                borderRadius: "16px"
                            }}
                        />

                        <CarouselCaption>

                            <h2>Festival Experiences</h2>

                            <p>
                                Discover cultural events, food festivals, and celebrations
                            </p>

                            <Button className="custom-btn">
                                Don't Miss Out
                            </Button>

                        </CarouselCaption>

                    </Carousel.Item>

                </Carousel>

            </Container>
        </>
    );
}

export default Banner2;