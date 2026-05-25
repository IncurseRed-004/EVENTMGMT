import React from "react";
import { Button, Carousel, CarouselCaption, Container } from "react-bootstrap";
import "./Banner.css"

function Banner(){
    return(
        <>
        <Container className="mt-4 md-4">
            <Carousel fade>
            <Carousel.Item>
                <img className="d-block w-100"
                src="https://images.unsplash.com/photo-1700514077430-3659e38eb5e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="event 1"
                height="500px"
                style={{
                        objectFit:"cover",
                        borderRadius:"16px"
                }} />

                <CarouselCaption>
                    <Button 
                    className="custom-btn"
                    >Book Now</Button> 
                </CarouselCaption>
            </Carousel.Item>


            <Carousel.Item>
                <img className="d-block w-100"
                src="https://images.unsplash.com/photo-1577733636635-4df3c15d88c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="event 2"
                height="500px"
                style={{
                        objectFit:"cover",
                        borderRadius:"16px"
                }} />

                <CarouselCaption>
                    <Button
                    className="custom-btn"
                    >Get It First</Button> 
                </CarouselCaption>
            </Carousel.Item>


            <Carousel.Item>
                <img className="d-block w-100"
                src="https://images.unsplash.com/photo-1562189447-17a5bb45a3f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="event 3"
                height="500px"
                style={{
                        objectFit:"cover",
                        borderRadius:"16px"
                }} />

                <CarouselCaption>
                    <Button 
                    className="custom-btn"
                    >Dont Miss Out</Button> 
                </CarouselCaption>
            </Carousel.Item>    

            </Carousel>
        </Container>

        </>
    )
}
export default Banner;