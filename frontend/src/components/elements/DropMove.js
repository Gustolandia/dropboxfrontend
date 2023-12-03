import React, { useState, useEffect } from 'react';
import {Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';
import Cookies from 'js-cookie'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { fetchSnapshotData } from '../middleware/fetchSnapshotData';




export const DropMove = ({info, reload}) => {
    const [possibleFolders, setPossibleFolders]= useState({})
  
    
    useEffect(() => {
        const getFolders = async () =>{
            if (Cookies.get('token')!==undefined){
                try {
                    const response = await fetch(process.env.REACT_APP_API+'/api/file/suitable-folders/'+info.type+'/'+info.id, {
                    method: 'GET',
                    headers: { 'Content-Type': 'text/plain',
                    'Authorization': 'Bearer '+Cookies.get('token')} 
                    });
                    
                    if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                    }

                    const result = await response.json();
                    setPossibleFolders(result);

                
                } catch (error) {

                    console.log('errors:'+error);
                } finally {
                }
            }else{

                console.log(401)
            }
        }
        getFolders()
    },[info.type, info.id]);

    const transfer = async (id) =>{
        if (Cookies.get('token')!==undefined){
            try {
                const response = await fetch(process.env.REACT_APP_API+'/api/file/update/'+info.type+'/'+info.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/JSON',
                'Authorization': 'Bearer '+Cookies.get('token')},
                body: JSON.stringify({ "name": info.name, "parent_id": id }) 
                });
                
                if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
                }

                const result = await response.json();
                setPossibleFolders(result);

                const message = await fetchSnapshotData();
                console.log(message);

                reload('File transfered')

            } catch (error) {

                console.log('errors:'+error);
            } finally {
            }
        }else{

            console.log(401)
        }
    }

  return (
    <>{Object.values(possibleFolders).length!==0?<DropdownButton
              as={ButtonGroup}
              key={'end'}
              id={`dropdown-button-drop-end`}
              drop={'end'}
              variant="link"
              title={`Move to...`}

            >
                {Object.values(possibleFolders).map((data) => (
                    data.id!==null?<Dropdown.Item key={data.id} onClick={()=>transfer(data.id)}><FontAwesomeIcon icon={faFolder} /> {data.name}</Dropdown.Item>
                    :
                    <Dropdown.Item key={'root'} onClick={()=>transfer(null)}><FontAwesomeIcon icon={faFolder} /> ./root</Dropdown.Item>

                ))}

            </DropdownButton>
            :
            <DropdownButton
              as={ButtonGroup}
              key={'end'}
              id={`dropdown-button-drop-end`}
              drop={'end'}
              variant="link"
              title={`Move to...`}
                disabled={true}
                style={{'cursor': 'not-allowed'}}
            ></DropdownButton>}</>
  );
}