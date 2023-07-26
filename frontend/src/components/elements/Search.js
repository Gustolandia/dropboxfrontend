import { useEffect, useState } from "react";

import {Col, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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
    props.filteredData(getFilteredItems(query, props.unfilteredData));
  },[query, props])
  return (
    <div className="mb-3">
    <Row>
      <Col xs={7}></Col>
      <Col xs={5}>
        <input type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} /> <FontAwesomeIcon icon={faUser} />
      </Col>
    </Row>
    </div>
  );
}
