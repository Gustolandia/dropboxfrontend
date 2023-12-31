import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { fetchSnapshotData } from '../middleware/fetchSnapshotData';


export const ModalFolder = ({parent,reload} ) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  let parentId
  parent===null? parentId=null : parentId=parent.id;
  const handleChange = async () => {
    
    try {
      const response = await fetch(process.env.REACT_APP_API+'/api/file/create/folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' ,
        'Authorization': 'Bearer '+Cookies.get('token')},
        body: JSON.stringify({"name":name, "parent_id":parentId})
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result)
      setName('');
      const message = await fetchSnapshotData();
      console.log(message);
      reload('ReloadCreateFolder');
    } catch (err) {
      console.log(err.message);
    } finally {


    }

      
  } 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        New folder
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Folder name</Form.Label>
              <Form.Control as="input" onChange={(e) => setName(e.target.value)} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleChange()}>
            Confirm folder name
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

