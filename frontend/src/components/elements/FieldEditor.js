import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Col} from 'react-bootstrap';
import Cookies from 'js-cookie';


export const FieldEditor = ({data, reload}) => {
  const [show1, setShow1] = useState('');
  const [field, setField] = useState('');



  const handleChange = async () => {
    
      try {
        const response = await fetch(process.env.REACT_APP_API+'/api/user/edit', {
          method: 'PUT',
          headers: { 'Content-Type': 'text/plain' ,
          'Authorization': 'Bearer '+Cookies.get('token')},
          body: JSON.stringify({[show1]:field })
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log(result)
        if(show1==="username"||show1==="password"){
          window.location.reload(false);
          reload('trying3')
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setShow1('');
        setField('');
        reload('trying')
      }
      reload('trying1')
        
    } 
    

  return (
    <>
        {Object.keys(data).map((keyName, i) => (
            <><Col key={2*i} className='my-2' xs={12} sm={9} > 
                {keyName.charAt(0).toUpperCase() + keyName.slice(1)}: {show1===keyName?<input onChange={(e) => setField(e.target.value)} type="text" Placeholder={keyName}/>:data[keyName]}
            </Col>
            <Col key={2*i+1} className='my-2' xs={12} sm={3} >
                {show1===keyName?<Button className='w-100' variant="primary" onClick={() => handleChange()}> Save {keyName.charAt(0).toUpperCase() + keyName.slice(1)}</Button>:<Button className='w-100' variant="primary" onClick={() => setShow1(keyName)}> Edit {keyName.charAt(0).toUpperCase() + keyName.slice(1)}</Button>}
            </Col></>
        ))
        }
    </>
  );
}

