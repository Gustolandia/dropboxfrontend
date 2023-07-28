import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { Loading } from "./Loading";
import {FieldEditor} from './FieldEditor';
import {DeleteUser} from './DeleteUser';
import {Login} from './Login';
import { Row} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const ModalUser = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [err, setErr] = useState('');
  const [data, setData] = useState('');
  const [reload, setReload] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pleaseReload = (please) => {
    setReload(please)
  }

  useEffect(() => {
    setIsLoading(true);
    if(show===true){
        const dataFetch = async () => {
            if (Cookies.get('token')!==undefined){
                try {
                    const response = await fetch(process.env.REACT_APP_API+'/api/user/me', {
                    method: 'GET',
                    headers: { 'Content-Type': 'text/plain',
                    'Authorization': 'Bearer '+Cookies.get('token')} 
                    });
                    
                    if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                    }

                    setData(await response.json());
                    setStatus(response.status)
                    setErr('');
                } catch (error) {
                    setErr(error.message);

                    setStatus(401);
                    console.log(error);
                } finally {
                    setIsLoading(false);


                }
            }else{
                setStatus(401)
                setIsLoading(false);
            }   
        }
        dataFetch()
    }else{
        setIsLoading(false);
    }
    setReload('');
    
  },[err, show, reload]);
  return (
    <>
      <FontAwesomeIcon icon={faUser} size = '2x' onClick={handleShow} style={{cursor: 'pointer'}}/>

        {isLoading?
        <Loading/>
        :
        status!==401?
            <Modal show={show} onHide={handleClose} animation={false} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row >
                        <FieldEditor data={data} reload={pleaseReload}/>
                        
                    </Row>
                    <DeleteUser/>
            </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>:
            <Login/>
            }
    </>
  );
}
