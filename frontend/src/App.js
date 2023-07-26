import "./App.css";

import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Sharing } from "./components/Pages/Sharing";
import { Requests } from "./components/Pages/Requests";
import { Deleted } from "./components/Pages/Deleted";
import { Container} from 'react-bootstrap';
import { Loading } from "./components/elements/Loading";

function App() {
  return (
    <Container>
      <div className='pt-5 min-vh-100'>
      <Router>
        

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sharing" element={<Sharing />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/deleted" element={<Deleted />} />
                <Route path="/loading" element={<Loading />} />
            </Routes>

      </Router>
      </div>
  </Container>
  );
}

export default App;
