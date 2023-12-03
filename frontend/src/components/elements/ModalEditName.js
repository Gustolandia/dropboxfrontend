import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { fetchSnapshotData } from '../middleware/fetchSnapshotData';


export const ModalEditName = ({info, reload} ) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');

  const handleChange = async () => {
    
    try {
      const response = await fetch(process.env.REACT_APP_API+'/api/file/update/'+info.type+'/'+info.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/JSON' ,
        'Authorization': 'Bearer '+Cookies.get('token')},
        body: JSON.stringify({"name":name, "parent_id":info.parent_id})
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.body}`);
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
      <span onClick={handleShow}>
        Edit name
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Name of "{info.name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>New Name</Form.Label>
              <Form.Control as="input" onChange={(e) => setName(e.target.value)} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleChange}>
            Confirm new name
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

