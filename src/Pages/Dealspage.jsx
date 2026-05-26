import React from "react";
import { Container } from "react-bootstrap";

function Deals() {

    return (
        <>
            <Container
                style={{
                    minHeight: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    padding: "40px"
                }}
            >

                <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1170&auto=format&fit=crop"
                    alt="Under Construction"
                    style={{
                        width: "100%",
                        maxWidth: "900px",
                        height: "500px",
                        objectFit: "cover",
                        borderRadius: "18px",
                        marginBottom: "30px",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                    }}
                />

                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: "700",
                        marginBottom: "15px"
                    }}
                >
                    Deals Page Under Development
                </h1>

                <p
                    style={{
                        fontSize: "1.1rem",
                        color: "#666",
                        maxWidth: "700px"
                    }}
                >
                    We are currently building exciting new deals and exclusive offers
                    for you. Stay tuned for upcoming discounts, event packages,
                    and premium experiences.
                </p>

            </Container>
        </>
    );
}

export default Deals;