import React from 'react';
import ReactDOM from 'react-dom/client';
// import DreiRefraction from './examples.js';
import * as constants from './examples.js';
import './index.css';

console.log(constants)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DreiRefraction />
  </React.StrictMode>
);
