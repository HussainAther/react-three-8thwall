// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
import React from 'react';
import DreiRefraction from './examples';

class ARApp extends React.Component {
  render() {
    return (
      <div>
        {/* Other JSX code for your AR app */}
        <DreiRefraction />
      </div>
    );
  }
}

export default ARApp;
