import React, { useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { fetchSnapshotData } from '../middleware/fetchSnapshotData';



export const ModalUpdateFile = ({info, reload}) => {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);

  const handleFileChange = () => {
    reload('');
    const file = inputFileRef.current.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  const handleConfirm = async () => {
    
    
      const file = selectedFile;
      
      const reader = new FileReader();
      
      reader.onload = async function(e) {
        try {

          const content = window.btoa(new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          const response = await fetch(process.env.REACT_APP_API+'/api/file/update/file/'+info.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/JSON' ,
            'Authorization': 'Bearer '+Cookies.get('token')},
            body: JSON.stringify({"name":file.name, "parent_id":info.parent_id, "content":content, "size":file.size})
          });

          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }

          const result = await response.json();

          console.log(`Updated ${file.name}:`, result);
          
          const message = await fetchSnapshotData();
          console.log(message);
          reload('ReloadUpdateFile');
        } catch (err) {
          console.log(`Error updating ${file.name}:`, err.message);
        } finally {

        }
        
        
      };
      reader.readAsArrayBuffer(file);

      
    
    
    setSelectedFile(null);
    
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span variant="link" onClick={handleShow}>
        Update file
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update File "{info.name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>File to update into:</Form.Label>
              <Form.Control as="input" type="file" ref={inputFileRef} onChange={handleFileChange} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


