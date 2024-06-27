import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";


import PatientList from "./components/page/list.component";
import Create from "./components/page/create.component";


function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          OPD APP
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route exact path='/' element={<PatientList />} />
            <Route exact path='/create' element={<Create />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;