import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button} from 'react-bootstrap';
import { ModalsRight } from "../elements/ModalsRight";
import { ListOfSnapshots } from "../elements/ListOfSnapshots";

import Search from "../elements/Search"
import NavBar from "../NavBar";
import Cookies from 'js-cookie';
import { Login } from "../elements/Login";
import { Loading } from "../elements/Loading";

export const Snapshot = ({Right}) => {
  const [status, setStatus] = useState('');
  const [reload, setReload] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parent, setParent] = useState(null);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [elements, setElements] = useState([<Button variant="light" style={{cursor: 'pointer'}} onClick={() => returnFunction()}>../</Button>]);


  const returnFunction = (pare, e) =>{

    if (pare!==undefined && pare!==null){
      const newElement=<Button variant="light" style={{cursor: 'pointer'}} key={pare.type+pare.id} onClick={() => returnFunction(pare)}>{pare.name}/</Button>
      setElements([...elements, newElement]);
      setParent(pare);
    }
    else{
      setElements([<Button variant="light" style={{cursor: 'pointer'}} onClick={() => returnFunction()}>../</Button>]);
      setParent(null);
    } 
    
  };

  const filteredFunction = (filteredData) => {
    setFilteredData(filteredData);
  };

  const parentFunction = (par) => {
    setParent(par);
    const newElement=<Button variant="light" style={{cursor: 'pointer'}} key={par.type+par.id} onClick={(e) => returnFunction(par, e)}>{par.name}/</Button>
    setElements(prevElements => [...prevElements, newElement]);
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
  const setLogoutValue = (value) => {
    if (value){
      setParent(null);
      setElements([<Button variant="light" style={{cursor: 'pointer'}} onClick={() => returnFunction()}>../</Button>])

    }
  };



  useEffect(() => {
    setIsLoading(true);
    const dataFetch = async () => {
      if (Cookies.get('token')!==undefined){
      try {
        const response = await fetch(process.env.REACT_APP_API+'/api/zfs/snapshots', {
          method: 'GET',
          headers: { 'Content-Type': 'text/plain',
          'Authorization': 'Bearer '+Cookies.get('token')} 
        });
        
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        setStatus(response.status)
        setData(result)
        setFilteredData(result)
      } catch (error) {

        setStatus(error.message);
        console.log('errors:'+error);
      } finally {
        setIsLoading(false);


      }}else{

        setStatus(401)
        setIsLoading(false);
      }
    }
    setReload('');
    dataFetch();
  },[parent, reload]);



  return (
    <>{isLoading? <Loading/>:
      status===200?
      
      <Row > 

            <Col xs={2} sm={3}>
              <NavBar reloaded={reloadedFunction} isItLoading={isItLoading} logout={setLogoutValue}/>
            </Col>
            <Col xs={10} sm={9} >
              <Container className='pt-5 mt-5'>

                <Search unfilteredData={data} filteredData={filteredFunction} problem={error} />

                <Row >
                  <Col sm={8}>
                    <ListOfSnapshots data={filteredData} parent={parentFunction} reload={reloadedFunction}/>


                  </Col>
                  <Col sm={4} >
                    {Right?<ModalsRight parent={parent} reload={reloadedFunction}/>:<></>}
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
