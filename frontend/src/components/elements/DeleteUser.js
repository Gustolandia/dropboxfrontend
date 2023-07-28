import { useState} from 'react';
import Button from 'react-bootstrap/Button';

import Cookies from 'js-cookie';


export const DeleteUser = () => {
    const [initial, setInitial] = useState(true);
    const [field, setField] = useState('');
    const [warning, setWarning] = useState(true);
    const handleInitial = () => setInitial(false);
    const handleFinal = async () => {
        if (field==="delete account"){
            try {
                const response = await fetch(process.env.REACT_APP_API+'/api/user/delete', {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'text/plain' ,
                  'Authorization': 'Bearer '+Cookies.get('token')},
                });
        

                if (!response.ok) {
                  throw new Error(`Error! status: ${response.status}`);
                }
        
                const result = await response.json();
        
                console.log(result)

                window.location.reload(false);


              } catch (err) {
                console.log(err.message);
              } finally {


              }

                
            }else{
                setWarning(false)

            } 
        }


  return (
    <>
        {
        initial?
        <Button className='my-3 w-100' variant="danger" onClick={handleInitial}>Delete Account</Button>
        :
        warning?
        <><label style={{color:'red'}}>Please write "delete account" (low case) in order to delete this account</label><input className='w-100' onChange={(e) => setField(e.target.value)}/><Button className='my-3 w-100' variant="danger" onClick={handleFinal}>Confirm Delete</Button> </>
        :
        <><label style={{color:'red'}}>Nah, nah. You must write exactly "delete account" (All low case, no spaces before or after and no "")</label><input className='w-100' onChange={(e) => setField(e.target.value)}/><Button className='my-3 w-100' variant="danger" onClick={handleFinal}>Confirm Delete</Button> </>
        }
    </>
  );
}