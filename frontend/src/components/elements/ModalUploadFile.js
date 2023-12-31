import React, { useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { fetchSnapshotData } from '../middleware/fetchSnapshotData';



export const ModalUploadFile = ({parent, reload}) => {
  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const inputFileRef = useRef(null);

  const handleFileChange = () => {
    reload('');
    const files = inputFileRef.current.files;
    setSelectedFiles([...files]);
  };
  let parentId
  parent===null? parentId=null : parentId=parent.id;
  const handleConfirm = async () => {
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      const reader = new FileReader();
      
      reader.onload = async function(e) {
        console.log('It reaches here');
        try {

          const content = window.btoa(new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          const response = await fetch(process.env.REACT_APP_API+'/api/file/create/file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' ,
            'Authorization': 'Bearer '+Cookies.get('token')},
            body: JSON.stringify({"name":file.name, "parent_id":parentId, "content":content, "size":file.size})
          });

          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }

          const result = await response.json();

          console.log(`Uploaded ${file.name}:`, result);
          const message = await fetchSnapshotData();
          console.log(message);
          reload('ReloadCreateFile');
        } catch (err) {
          console.log(`Error uploading ${file.name}:`, err.message);
        } finally {

        }
        
        
      };
      reader.readAsArrayBuffer(file);

      
    }
    
    setSelectedFiles([]);
    
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Upload files
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Files to upload</Form.Label>
              <Form.Control as="input" type="file" ref={inputFileRef} onChange={handleFileChange} multiple rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


