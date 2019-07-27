import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <div className="left">
          LEFT
        </div>
        <div className="right">
          <div className="child scrollable">
            RIGHT
            <br />
            <br />
            <br />
            Lorem ipsum dolor  kasamet.
          </div>
        </div>
      </div>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
