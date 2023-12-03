import "./App.css";

import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Snapshot } from "./components/Pages/Snapshot";

import { Loading } from "./components/elements/Loading";
import {myFiles,deleted,sharing} from "./data";


function App() {
  return (

      <div className='min-vh-100'>
      <Router>
        

            <Routes>
                <Route path="/" element={<Home data={myFiles} Right={true} />} />
                <Route path="/home" element={<Home data={myFiles} Right={true} />} />
                <Route path="/snapshots" element={<Snapshot data={sharing} Right={false} />} />
                <Route path="/deleted" element={<Home data={deleted} Right={false} />} />
                <Route path="/loading" element={<Loading />} />
            </Routes>

      </Router>
      </div>

  );
}

export default App;
