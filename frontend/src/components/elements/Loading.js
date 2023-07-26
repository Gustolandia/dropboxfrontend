import { Spinner } from 'react-bootstrap';
import "./Loading.css";

export const Loading = () => {
  return <h1 className='center'><Spinner animation="grow" />Loading...</h1>
}

export default Loading;