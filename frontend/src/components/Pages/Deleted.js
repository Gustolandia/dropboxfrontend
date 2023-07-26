import React, {useState, useEffect} from "react";
import {Container, Col, Row} from 'react-bootstrap';

import { ListOfFiles } from "../elements/ListOfFiles";
import {deleted} from "../../data";
import Search from "../elements/Search"
import NavBar from "../NavBar";
import Cookies from 'js-cookie';
import { Login } from "../elements/Login";
import { Loading } from "../elements/Loading";

export const Deleted = () => {
  const [state, setState] = useState({data: deleted});
  const [err, setErr] = useState('');
  const [status, setStatus] = useState('');
  const [reload, setReload] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  
  const filteredFunction = (filteredData) => {
    setState(filteredData);
  };

  const reloadedFunction = (reloadedData) => {
    setReload(reloadedData);
    console.log(reload);
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

        const result = await response.json();
        console.log(result)
        console.log('result is: ', response.status);
        setStatus(response.status)
        setErr('');
      } catch (error) {
        setErr(error.message);
        setStatus(error.message);
        console.log('errors:'+err);
      } finally {
        console.log(reload)
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
      
      <Row> 

            <Col xs={3}>
              <NavBar reloaded={reloadedFunction}/>
            </Col>
            <Col xs={9}>
        <Container>

          <Search unfilteredData={deleted} filteredData={filteredFunction} />

          <Row>
            <Col xs={8}>
              <ListOfFiles data={state}/>
            </Col>
            <Col xs={4}>

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