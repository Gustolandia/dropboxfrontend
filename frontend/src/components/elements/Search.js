import { useEffect, useState } from "react";

import {Col, Row} from 'react-bootstrap';
const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  if (items.data!==undefined){return items.data.filter((item) => item.name.includes(query))}
  else{return items.filter((item) => item.name.toLowerCase().includes(query))};
};

export default function Search(props) {
  const [query, setQuery] = useState("");


  useEffect(() => {
    props.setState(getFilteredItems(query, props.unfilteredData));
  })
  return (
    <div className="mb-3">
    <Row>
      <Col xs={8}></Col>
      <Col xs={4}>
      <input type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
      </Col>
    </Row>
    </div>
  );
}
