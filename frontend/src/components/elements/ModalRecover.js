import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';

export const ModalRecover = ({info, reload} ) => {
  const [show, setShow] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [warning, setWarning] = useState(false);


  const handleRecovery = async () => {
    if (confirmation==='confirm'){
        try {
          const response = await fetch(process.env.REACT_APP_API+'/api/zfs/recovery', {
              method: 'POST',
              headers: { 'Content-Type': 'application/JSON' ,
              'Authorization': 'Bearer '+Cookies.get('token')},
              body: JSON.stringify({"name":info.name})
          });

          if (!response.ok) {
              throw new Error(`Error! status: ${response}`);
          }
          //console.log(response.headers.get('Content-Type'));

          const result = await response.text();

          console.log(result)
          setConfirmation('');
          reload('ReloadRecovery');
          setWarning(false)
          window.location.href = '/home';
        } catch (err) {
          console.log(err);
        } finally {


        }
    }else{
      setWarning(true)
    }

      
  } 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}>
        Recover to this point
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recover the system to {info.date_and_hour}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              {warning===false?<Form.Label>Please write 'confirm'. Be aware, all data after the indicated date and time will be lost!</Form.Label>: <Form.Label>Please write 'confirm'! What you have written does not correspond exactly (check for spaces)</Form.Label>}
              <Form.Control as="input" onChange={(e) => setConfirmation(e.target.value)} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRecovery}>
            Confirm Recovery
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}