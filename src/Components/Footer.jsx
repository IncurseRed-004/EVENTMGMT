import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#7b2cbf",
        color: "white",
      }}
      className="text-center py-3 mt-5"
    >
      <Container>
        <p className="mb-0">
          © 2026 TheCartSub. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;