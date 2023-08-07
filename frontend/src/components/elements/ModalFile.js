import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';

export const ModalFile = ({parent, reload}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  console.log(parent,name)
  const handleChange = async () => {
    
    try {
      const response = await fetch(process.env.REACT_APP_API+'/api/file/create/file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' ,
        'Authorization': 'Bearer '+Cookies.get('token')},
        body: JSON.stringify({"name":name, "parent_id":parent, "content":null})
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result)
      
    } catch (err) {
      console.log(err.message);
    } finally {
      setName('');
      reload('trying');
    }
    reload('ReloadCreateFile');
      
  } 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create new file
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>File name</Form.Label>
              <Form.Control as="input" onChange={(e) => setName(e.target.value)} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleChange()}>
            Confirm file name
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

