import React, {useState} from "react"
import {Container, Col, Row} from 'react-bootstrap';

import { ListOfFiles } from "../elements/ListOfFiles";
import {deleted} from "../../data";

import Search from "../elements/Search"

export const Deleted = () => {

  const [state, setState] = useState({data: deleted});
  return (
    <Container>
      <Search unfilteredData={deleted} setState={setState} />
      <Row>
        <Col xs={8}>
          <ListOfFiles data={state}/>
        </Col>
        <Col xs={4}>
        </Col>
      </Row>
    </Container >
  );
}