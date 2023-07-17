import React, {useState} from "react";
import {Container, Col, Row} from 'react-bootstrap';

import { ListOfFiles } from "../elements/ListOfFiles";
import {fileRequests} from "../../data";
import Search from "../elements/Search"

export const Requests = () => {

  const [state, setState] = useState({data: fileRequests});
  return (
    <Container>
      <Search unfilteredData={fileRequests} setState={setState} />
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
