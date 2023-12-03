import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from 'js-cookie'; 
import { ModalEditName } from './ModalEditName';
import { ModalUpdateFile } from './ModalUpdateFile';
import { DropMove } from './DropMove';


export const DropMenu = ({info, reload}) => {
  
  const deleteFile = async () =>{
    if (Cookies.get('token')!==undefined){
      try {
        const response = await fetch(process.env.REACT_APP_API+'/api/file/delete/'+info.type+'/'+info.id, {
          method: 'DELETE',
          headers: { 'Content-Type': 'text/plain',
          'Authorization': 'Bearer '+Cookies.get('token')} 
        });
        
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.blob();
        console.log(result);

    
      } catch (error) {

        console.log('errors:'+error);
      } finally {
        reload('DeletedItem')
      }}else{

        console.log(401)
      }
    }

    const downloadFile = async () =>{
      if (Cookies.get('token')!==undefined){
        try {
          const response = await fetch(process.env.REACT_APP_API+'/api/file/download/'+info.type+'/'+info.id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/zip',
            'Authorization': 'Bearer '+Cookies.get('token')} 
          });
          
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
  
          const result = await response.blob();
          console.log(response);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(result);
          link.download = info.name; 
          link.style.display = 'none'; 
          document.body.appendChild(link);
          link.click();
      
          // Clean up
          window.URL.revokeObjectURL(link.href);
          document.body.removeChild(link);
        } catch (error) {
  
          console.log('errors:'+error);
        } finally {
        }}else{
  
          console.log(401)
        }
      }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic" style={{textDecoration:'none'}}>
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={deleteFile}>Delete</Dropdown.Item>
        <Dropdown.Item onClick={downloadFile}>Download</Dropdown.Item>
        <Dropdown.Item ><ModalEditName info={info} reload={reload}/></Dropdown.Item>
        {info.type==='file'?<Dropdown.Item href="#/action-3"><ModalUpdateFile info={info} reload={reload}/></Dropdown.Item>: <></>}
        <Dropdown.Divider />
        <div className='w-100 px-1'><DropMove info={info} reload={reload}/></div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
