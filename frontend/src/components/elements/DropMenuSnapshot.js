import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from 'js-cookie'; 
import { ModalRecover } from './ModalRecover';


export const DropMenuSnapshot = ({info, reload}) => {
  
  const deleteSnap = async () =>{
    if (Cookies.get('token')!==undefined){
      try {
        const response = await fetch(process.env.REACT_APP_API+'/api/zfs/snapshot', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/JSON',
          'Authorization': 'Bearer '+Cookies.get('token')},
          body:JSON.stringify({"name":info.name}) 
        });
        
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.blob();
        console.log(result);

        reload('DeletedItem')
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
        <Dropdown.Item onClick={deleteSnap}>Delete</Dropdown.Item>
        <Dropdown.Item ><ModalRecover info={info} reload={reload}/></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
