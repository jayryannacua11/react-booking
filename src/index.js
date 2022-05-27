import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
//Import this one ^ to access bootstrap, read react bootstrap documentation

const name = 'John Smith';
const element = <h1>Hello, {name}</h1>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //You can erase this <React.StrictMode> to <> </> (React Fragments)
 /* 
 <React.StrictMode>
    {element}
    <h1>Hello, {name}</h1>
    <h3>Full Stack Developer</h3>
    <h4>Welcome to my page</h4>
  </React.StrictMode>
 */
  <>
    <App />
  </>
);


