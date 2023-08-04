import { useEffect, useState } from "react";

import {Col, Row} from 'react-bootstrap';

import { ModalUser } from "../elements/ModalUser";

const getFilteredItems = (query, items) => {

  if (!query) {
    return items;
  }
  if (items.data!==undefined){return items.data.filter((item) => item.name.includes(query))}
  else{return items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))};
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
      <Col xs={5} className="d-flex justify-content-end">
        <input className='mx-2 mb-3 rounded' type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} /> <ModalUser errorCode={errorFunction}/>
      </Col>
    </Row>
    </div>
  );
}
