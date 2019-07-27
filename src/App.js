import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <body>
        <h2>CSS Layout Flexbox</h2>
        <p>In this example, we have created a header, two columns/boxes and a footer. On smaller screens, the columns will stack on top of each other.</p>
        <p>Resize the browser window to see the responsive effect.</p>
        <p>
          <strong>Note:</strong>
          {' '}
Flexbox is not supported in Internet Explorer 10 and earlier versions.
        </p>


        <section>
          <nav>
            <ul>
              <li><a href="#">London</a></li>
              <li><a href="#">Paris</a></li>
              <li><a href="#">Tokyo</a></li>
            </ul>
          </nav>

          <article>
            <h1>London</h1>
            <p>London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
            <p>Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>
          </article>
        </section>

        <footer>
          <p>Footer</p>
        </footer>

      </body>
    </div>
  );
}

export default App;
