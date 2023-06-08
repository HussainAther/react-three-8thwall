import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import DreiRefraction from './examples';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
//   render() {
//     return (
//       <div>
//         {/* Other components and UI elements */}
//         <DreiRefraction />
//         {/* Additional components and UI elements */}
//       </div>
//     );
//   }
  
// );

const App = () => {
  return (
    <div>
      {/* Other components and UI elements */}
      <DreiRefraction />
      {/* Additional components and UI elements */}
    </div>
  );
}

export default App;
