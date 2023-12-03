import React, {useState} from "react";
import {Table} from 'react-bootstrap';
import {DropMenu} from './DropMenu';
import Cookies from 'js-cookie';


import {ButtonSelect} from './ButtonSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}



export const ListOfFiles = ({data, parent, reload }) => {
  const [checkedElements, setCheckedElements]= useState([]);
  const [selected, setSelected]= useState(false);


  const openFolder = (parents) =>{
    parent(parents);

  }

  const selection = (e) => setSelected(e)
  const selectAllFunction =(value)=>{
    if (value) {
      setCheckedElements(data);

    }

  }

  const openFile = async (file) =>{
    if (Cookies.get('token')!==undefined){
      try {
        const response = await fetch(process.env.REACT_APP_API+'/api/file/download/file/'+file.id, {
          method: 'GET',
          headers: { 'Content-Type': 'text/plain',
          'Authorization': 'Bearer '+Cookies.get('token')} 
        });
        
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.blob();
        console.log(response);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(result);
        link.download = file.name; 
        link.style.display = 'none'; 
        document.body.appendChild(link);
        link.click();
    
        // Clean up
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      } catch (error) {

        console.log('errors:'+error);
      } finally {

      }}else{

        console.log(401)
      }
    }
    const addToList = (e) => {
      if (checkedElements.includes(e)){
        setCheckedElements(checkedElements.filter(obj => 
          !(obj.id === e.id && obj.type === e.type)));
      }else{
        setCheckedElements([...checkedElements,e])
      }
      
    }

  
  
  return (
            <>
              
              <Table>

                <thead>
                  <tr>
                    <th scope="col"> <ButtonSelect checkedElements={checkedElements} selected={selection} unCheckedElements={()=>setCheckedElements([])} selectAll={selectAllFunction} reload={reload}/> </th>
                    <th scope="col">Name</th>
                    <th scope="col">Modified</th>
                    <th scope="col">Size</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {data!==null? data.map((info)=>{
                      return(
                      <React.Fragment key={info.type + info.id}>
                        {info.type==='folder'?
                        <tr style={{cursor: 'pointer'}}>    
                            {selected?<td ><input type="checkbox" checked={checkedElements.some(element => element.id === info.id && element.type === info.type)} id={info.type+info.id} onChange={()=>{addToList(info)}}></input></td>: <td></td>}
                            <td  onClick={() => openFolder(info) }><FontAwesomeIcon icon={faFolder} /> {info.name}</td>
                            <td  onClick={() => openFolder(info) }>{info.created_at}</td>
                            <td  onClick={() => openFolder(info) }>-</td> 
                            <td><DropMenu info={info} reload={reload}/></td>
                        </tr>
                        :
                        <tr style={{cursor: 'pointer'}}  >
                            {selected?<td ><input type="checkbox" checked={checkedElements.some(element => element.id === info.id && element.type === info.type)} id={info.type+info.id} onChange={()=>{addToList(info)}}></input></td>: <td></td>}
                            <td onClick={() => openFile(info)}><FontAwesomeIcon icon={faFile} /> {info.name}</td>
                            <td onClick={() => openFile(info)}>{info.created_at}</td>
                            <td onClick={() => openFile(info)}>{formatBytes(info.size)}</td>
                            <td><DropMenu info={info} reload={reload} /></td>
                        </tr>}
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