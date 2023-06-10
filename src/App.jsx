import XR8Scene from './XR8Scene';
import { useRef, useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import LoadedGltf from './LoadedGltf';
import { Html } from '@react-three/drei';

function App() {
  const canvasRef = useRef();
  const R3Scene = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [modelId, setModelId] = useState('');
  const [modelData, setModelData] = useState(null);

  let { onxrloaded } = XR8Scene(canvasRef, R3Scene);

  useEffect(() => {
    XRExtras.Loading.showLoading({ onxrloaded });
  }, []);

  const handleObjectClick = () => {
    // Handle object click event
    // This can be a placeholder for your object interaction logic
    console.log('Object clicked!');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate username and password
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
      console.log('Login successful!');
    } else {
      console.log('Invalid username or password!');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleModelIdChange = (e) => {
    setModelId(e.target.value);
  };

  useEffect(() => {
    // Fetch the model data when the user is logged in and modelId is provided
    const fetchModelData = async () => {
      try {
        const response = await fetch(`/api/models/${modelId}`);
        const data = await response.json();
        setModelData(data);
      } catch (error) {
        console.log('Error fetching model data:', error);
      }
    };

    if (isLoggedIn && modelId !== '') {
      fetchModelData();
    }
  }, [isLoggedIn, modelId]);

  return (
    <div className="App">
      <Canvas style={{ position: 'absolute' }}>
        <scene ref={R3Scene}>
          <ambientLight />
          {/* <DreiRefraction envMap={cubeCamera.renderTarget.texture} /> */}
          {modelData && <LoadedGltf onClick={handleObjectClick} modelData={modelData} />}
          <pointLight position={[10, 15, 10]} />
        </scene>
        {/* Overlay HTML for UI elements */}
        <Html>
          {isLoggedIn ? (
            <div className="menu">
              <h2>Welcome, {username}!</h2>
              <button onClick={handleLogout}>Logout</button>
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <input
                  type="text"
                  placeholder="Model ID"
                  value={modelId}
                  onChange={handleModelIdChange}
                />
                <button type="submit" onClick={() => { setModelData(null); }}>Fetch Model</button>
              </form>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          )}
        </Html>
      </Canvas>
      <canvas
        ref={canvasRef}
        width="480"
        height="640"
        style={{ position: 'absolute' }}
      ></canvas>
    </div>
  );
}

export default App;

