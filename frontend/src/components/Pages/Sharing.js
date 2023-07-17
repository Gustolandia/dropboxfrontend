import React, {useState} from "react";
import {Container, Col, Row} from 'react-bootstrap';

import { ListOfFiles } from "../elements/ListOfFiles";
import {sharing} from "../../data";
import Search from "../elements/Search"

export const Sharing = () => {

  const [state, setState] = useState({data: sharing});
  return (
    <Container>
      <Search unfilteredData={sharing} setState={setState} />
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
