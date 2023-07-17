import React from "react";
import {Table} from 'react-bootstrap';



export const ListOfFiles = (data) => {


  
  return (
            
            <Table>

              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Modified</th>
                  <th scope="col">Size</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {data.data.data!==undefined?
                data.data.data.map((info,key)=>{
                    return(
                    <tr key={key}>    
                        <td>{info.name}</td>
                        <td>{info.modified}</td>
                        <td>{info.size}</td>
                        <td>...</td>
                    </tr>
                )}):
                
                data.data.map((info,key)=>{
                  return(
                  <tr key={key}>    
                      <td>{info.name}</td>
                      <td>{info.modified}</td>
                      <td>{info.size}</td>
                      <td>...</td>
                  </tr>
              )})
                }
                  
                
                
              </tbody>
            </Table>

    );
  }