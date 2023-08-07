import React, {useState, useEffect} from "react";
import {Container, Col, Row} from 'react-bootstrap';
import { ModalsRight } from "../elements/ModalsRight";
import { ListOfFiles } from "../elements/ListOfFiles";

import Search from "../elements/Search"
import NavBar from "../NavBar";
import Cookies from 'js-cookie';
import { Login } from "../elements/Login";
import { Loading } from "../elements/Loading";

export const Home = ({Right, data}) => {
  const [state, setState] = useState({data: data});
  const [err, setErr] = useState('');
  const [status, setStatus] = useState('');
  const [reload, setReload] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredFunction = (filteredData) => {
    setState(filteredData);
  };

  const reloadedFunction = (reloadedData) => {
    setReload(reloadedData);
  };
  const isItLoading = (Loading) => {
    setIsLoading(Loading);
  };
  const error = (error) => {
    setStatus(error);
  };


  useEffect(() => {
    setIsLoading(true);
    const dataFetch = async () => {
      if (Cookies.get('token')!==undefined){
      try {
        const response = await fetch(process.env.REACT_APP_API+'/api/user/me', {
          method: 'GET',
          headers: { 'Content-Type': 'text/plain',
          'Authorization': 'Bearer '+Cookies.get('token')} 
        });
        
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        //const result = await response.json();
        setStatus(response.status)
        setErr('');
      } catch (error) {
        setErr(error.message);
        setStatus(error.message);
        console.log('errors:'+err);
      } finally {
        setReload('')
        setIsLoading(false);



      }}else{
        setReload('')
        setStatus(401)
        setIsLoading(false);
      }
    }
    dataFetch();
  },[reload, err]);

  


  return (
    <>{isLoading? <Loading/>:
      status===200?
      
      <Row > 

            <Col xs={2} sm={3}>
              <NavBar reloaded={reloadedFunction} isItLoading={isItLoading}/>
            </Col>
            <Col xs={10} sm={9} >
              <Container className='pt-5 mt-5'>

                <Search unfilteredData={data} filteredData={filteredFunction} problem={error} />

                <Row >
                  <Col sm={8}>
                    <ListOfFiles data={state}/>
                  </Col>
                  <Col sm={4} >
                    {Right?<ModalsRight parent={null} reload={reloadedFunction}/>:<></>}
                  </Col>
                </Row>
              </Container >
        </Col>
      </Row>
    :
    
    <Login reloaded={reloadedFunction}/>
    }  
    </>);
  }
