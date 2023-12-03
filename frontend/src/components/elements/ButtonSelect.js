
import React, {useState} from "react";

import Dropdown from 'react-bootstrap/Dropdown';
import {ConfirmDelete} from './ConfirmDelete'

export const ButtonSelect = ({checkedElements, selected, unCheckedElements, selectAll, reload}) => {
    const [isSelected, setIsSelected]= useState(false);
    

    const selection =() => {
        selected(true);
        setIsSelected(true);
    }

    const completeUnselection =() => {
        selected(false);
        setIsSelected(false);
        unCheckedElements([])
    }
    const selectionOfAll = () =>{
      selectAll(true);
    }

    

  return (
    <Dropdown >
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        ⋮
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {!isSelected?<Dropdown.Item disabled={false} onClick={selection}>Select Multiple</Dropdown.Item>:<Dropdown.Item disabled={true}>Select Multiple</Dropdown.Item> }
        {checkedElements.length === 0?<Dropdown.Item disabled={true}>Delete selected</Dropdown.Item>:<Dropdown.Item disabled={false}><ConfirmDelete reload={reload} checkedElements={checkedElements}/></Dropdown.Item> }
        {!isSelected?<Dropdown.Item disabled={true}>Unselect all</Dropdown.Item>:<Dropdown.Item disabled={false} onClick={completeUnselection}>Unselect all</Dropdown.Item> }
        {!isSelected?<Dropdown.Item disabled={true} >Select All</Dropdown.Item>:<Dropdown.Item disabled={false} onClick={selectionOfAll}>Select All</Dropdown.Item> }

        
      </Dropdown.Menu>
    </Dropdown>
  );
}
