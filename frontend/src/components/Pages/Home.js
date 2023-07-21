import React, {useState, useEffect} from "react";
import {Container, Col, Row} from 'react-bootstrap';
import { ModalsRight } from "../elements/ModalsRight";
import { ListOfFiles } from "../elements/ListOfFiles";
import {myFiles} from "../../data";
import Search from "../elements/Search"
import NavBar from "../NavBar";
import Cookies from 'js-cookie';
import { Login } from "../elements/Login";


export const Home = () => {
  const [state, setState] = useState({data: myFiles});
  const [err, setErr] = useState('');
  const [status, setStatus] = useState('');
  const [reload, setReload] = useState('');
  
  const filteredFunction = (filteredData) => {
    setState(filteredData);
  };

  const reloadedFunction = (reloadedData) => {
    setReload(reloadedData);
    console.log(reload);
  };


  useEffect(() => {
    const dataFetch = async () => {
      if (Cookies.get('token')!==undefined){
      try {
        const response = await fetch(process.env.REACT_APP_API+'/api/dashboard', {
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



      }}else{
        setReload('')
        setStatus(401)
      }
    }
    dataFetch();
  },[reload, err]);

  


  return (
    <>{
      status===200?
      
      <Row> 

            <Col xs={3}>
              <NavBar reloaded={reloadedFunction}/>
            </Col>
            <Col xs={9}>
        <Container>

          <Search unfilteredData={myFiles} filteredData={filteredFunction} />

          <Row>
            <Col xs={8}>
              <ListOfFiles data={state}/>
            </Col>
            <Col xs={4}>
              <ModalsRight/>
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
