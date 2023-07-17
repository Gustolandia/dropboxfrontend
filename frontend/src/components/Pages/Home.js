import React, {useState} from "react";
import {Container, Col, Row} from 'react-bootstrap';
import { ModalsRight } from "../elements/ModalsRight";
import { ListOfFiles } from "../elements/ListOfFiles";
import {myFiles} from "../../data";
import Search from "../elements/Search"

export const Home = () => {
  const [state, setState] = useState({data: myFiles});


  return (
      <Container>

        <Search unfilteredData={myFiles} setState={setState} />

        <Row>
          <Col xs={8}>
            <ListOfFiles data={state}/>
          </Col>
          <Col xs={4}>
            <ModalsRight/>
          </Col>
        </Row>
      </Container >
    );
  }
