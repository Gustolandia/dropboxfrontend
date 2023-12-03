import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Loading } from "./Loading";
import Cookies from 'js-cookie';
import { fetchSnapshotData } from '../middleware/fetchSnapshotData';

export const ModalUploadFolder = ({parent, reload}) => {
  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let parentId=null;
  if (parent!==null){
    parentId=parent.id;
  }
  
  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };
  
  const uploadFile = (file, currentParentId) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async function(e) {
        try {
          const content = window.btoa(new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          const response = await fetch(process.env.REACT_APP_API + '/api/file/create/file', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/JSON',
              'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify({ "name": file.name, "parent_id": currentParentId, "content": content, "size":file.size })
          });
  
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
  
          const result = await response.json();
          console.log(`Uploaded ${file.name}:`, result);
          resolve();
        } catch (err) {
          console.log(`Error uploading ${file.name}:`, err.message);
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };
  
  
  const createFolder = async (name, currentParentId) => {
    try {
      const response = await fetch(process.env.REACT_APP_API + '/api/file/create/folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
          'Authorization': 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify({ "name": name, "parent_id": currentParentId })
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result.id; 
    } catch (err) {
      console.log(err.message);
    }
  };
  
  const handleConfirm = async () => {
    setIsLoading(true);
    const folderMap = {};
    let uploadSuccess = true;  // To track if the folder creation was successful
  
    const uploadTasks = []; // This will store all the promises for the files to be uploaded.
  
    for (let file of selectedFiles) {
      const paths = file.webkitRelativePath.split('/');
      paths.pop(); // remove the file name
      let currentParentId = parentId;
      let currentPath = ''; 
  
      for (let path of paths) {
        currentPath += path + '/';  // Update the currentPath
        if (!folderMap[currentPath]) {
          currentParentId = await createFolder(path, currentParentId);
          if (currentParentId) {
            folderMap[currentPath] = currentParentId;
          } else {
            console.log('Failed to create folder:', path);
            uploadSuccess = false;  // Setting it to false if any folder creation fails
            break;  // Exiting out of the paths loop
          }
        } else {
          currentParentId = folderMap[currentPath];
        }
      }
  
      if (uploadSuccess) {
        // Only push the upload task if the folders were successfully created
        uploadTasks.push(uploadFile(file, currentParentId));
      } else {
        break;  // Exiting out of the main loop if folder creation failed
      }
    }
  
    if (uploadSuccess) {
      // Only if all folders were created successfully, proceed with file uploads
      await Promise.all(uploadTasks);
    }
  
    setSelectedFiles([]); // Clear the selected files after upload
    const message = await fetchSnapshotData();
    console.log(message);
    setShow(false);
    setIsLoading(false);
    reload('FolderUploaded');
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Upload Folder
      </Button>

      <Modal show={show} onHide={handleClose}>
        {!isLoading?
        <><Modal.Header closeButton>
            <Modal.Title>Upload Folder</Modal.Title>
          </Modal.Header><Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Folder to upload</Form.Label>
                  <Form.Control as="input" type="file" webkitdirectory="" directory="" multiple="" onChange={handleFileChange} rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body><Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Confirm upload
              </Button>
            </Modal.Footer>
        </>
        :
        <Loading/>}
      </Modal>
    </>
  );
}

