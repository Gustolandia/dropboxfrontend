import { useEffect, useState } from "react";

import {Col, Row} from 'react-bootstrap';

import { ModalUser } from "../elements/ModalUser";

const getFilteredItems = (query, items) => {

  if (!query) {
    return items;
  }
  if (items.data!==undefined){return items.data.filter((item) => item.name.includes(query))}
  else{return items.filter((item) => item.name.toLowerCase().includes(query))};
};



export default function Search({filteredData, unfilteredData}) {
  const [query, setQuery] = useState("");
  const [problem, setProblem] = useState("");



  const errorFunction = (error) => {
    setProblem(error);
  };

  useEffect(() => {
    filteredData(getFilteredItems(query, unfilteredData));
  },[query, filteredData, unfilteredData, problem])
  return (
    <div className="mb-3">
    <Row>
      <Col xs={7}></Col>
      <Col xs={5}>
        <input type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} /> <ModalUser errorCode={errorFunction}/>
      </Col>
    </Row>
    </div>
  );
}
