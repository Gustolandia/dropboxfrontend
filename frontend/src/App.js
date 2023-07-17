import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Sharing } from "./components/Pages/Sharing";
import { Requests } from "./components/Pages/Requests";
import { Deleted } from "./components/Pages/Deleted";

import {Col, Row, Container} from 'react-bootstrap';

function App() {
  return (
    <Container>
      <div className='mt-5'>
      <Router>
        <Row> 
          <Col xs={3}>
            <NavBar />
          </Col>
          <Col xs={9}>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sharing" element={<Sharing />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/deleted" element={<Deleted />} />
            </Routes>
              </Col>
        </Row> 
      </Router>
      </div>
  </Container>
  );
}

export default App;
