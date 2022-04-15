import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <Container>
        <h1 id="pagetitle">Song Rater</h1>
        <h1 id="pagetitle">Home</h1>
        <h1>
          <Link to="/login/">Login</Link>
        </h1>
        <h1>
          <Link to="/signup">Sign up</Link>
        </h1>
      </Container>
    );
  }
}

export default Home;
