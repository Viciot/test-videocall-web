import logo from './logo.svg';
import './App.css';
import Zoom from "./Zoom";
import { useState } from "react";

function App() {
  const [joinMeeting, setJoinMeeting] = useState(false);
  return (
    <div className="App">
      { joinMeeting ? (
            <Zoom /> 
      ) : (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button className="join-button" onClick={() => setJoinMeeting(true)}>Join Visit</button>        
        </header>
      )}
    </div>
  );
}

export default App;
