import React, {useState} from "react";
import {Table} from 'react-bootstrap';
import {DropMenuSnapshot} from './DropMenuSnapshot';

import {ButtonSelectSnapshot} from './ButtonSelectSnapshot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';



export const ListOfSnapshots = ({data, parent, reload }) => {
  const [checkedElements, setCheckedElements]= useState([]);
  const [selected, setSelected]= useState(false);



  const selection = (e) => setSelected(e)
  const selectAllFunction =(value)=>{
    if (value) {
      setCheckedElements(data);
    }
  }

  
    const addToList = (e) => {
      if (checkedElements.includes(e)){
        setCheckedElements(checkedElements.filter(obj => 
          !(obj.id === e.id )));
      }else{
        setCheckedElements([...checkedElements,e])
      }
      
    }

  
  
  return (
            <>
              
              <Table>

                <thead>
                  <tr>
                    <th scope="col"> <ButtonSelectSnapshot checkedElements={checkedElements} selected={selection} unCheckedElements={()=>setCheckedElements([])} selectAll={selectAllFunction} reload={reload}/> </th>
                    {console.log(checkedElements)}
                    <th scope="col">#</th>
                    <th scope="col">Created</th>
                    <th scope="col">Used</th>
                    <th scope="col">Refer</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {data!==null? data.map((info, key)=>{
                      return(
                      <React.Fragment key={info.name}>
                        <tr >
                            {selected?<td ><input type="checkbox" checked={checkedElements.some(element => element.name === info.name)} id={info.name} onChange={()=>{addToList(info)}}></input></td>: <td></td>}
                            <td >{key+1}</td>
                            <td ><FontAwesomeIcon icon={faCompactDisc} /> {info.date_and_hour}</td>
                            <td >{info.used}</td>
                            <td >{info.refer}</td>
                            <td><DropMenuSnapshot info={info} reload={reload} /></td>
                        </tr>
                      </React.Fragment>
                      
                  )
                
                  })
                  :
                        <h2>here</h2>
                }
                    
                  
                  
                </tbody>
              </Table>
            </>

    );
  }