import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';

export const ConfirmDeleteSnapshot = ({checkedElements, reload}) => {
  const [show, setShow] = useState(false);
  const handleDelete = async () => {
    try {
      const deletePromises = checkedElements.map(item => 
        fetch(process.env.REACT_APP_API+`/api/zfs/snapshot`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/JSON',
            'Authorization': 'Bearer '+Cookies.get('token')
          },
          body: JSON.stringify({"name":item.name})
        })
      );
      const responses = await Promise.all(deletePromises);
  
      const results = await Promise.all(responses.map(response => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.text();
      }));
  
      console.log(results);
      reload('DeleteSnap');
  
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}>
        Delete selected
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation of deleted snapshots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Are you sure you want to delete these {checkedElements.length} snapshot(s)?</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}