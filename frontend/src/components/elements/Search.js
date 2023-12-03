
import {Col, Row} from 'react-bootstrap';

import { ModalUser } from "../elements/ModalUser";

const getFilteredItems = (query, items) => {

  if (!query) {
    return items;
  }
  if (items.data!==undefined){return items.data.filter((item) => item.name.includes(query))}
  else{return items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))};
};



export default function Search({filteredData, unfilteredData, error}) {


  const changeSearch = (term) => {
    filteredData(getFilteredItems(term, unfilteredData));
  }
  return (
    <div className="mb-3">
    <Row>
      <Col xs={7}></Col>
      <Col xs={5} className="d-flex justify-content-end">
        <input className='mx-2 mb-3 rounded' type="text" placeholder="Search" onChange={(e) => changeSearch(e.target.value)} /> <ModalUser errorCode={error}/>
      </Col>
    </Row>
    </div>
  );
}
