import XR8Scene from './XR8Scene';
import { useRef, useEffect } from 'react';
import './App.css';
import { Canvas, useThree } from '@react-three/fiber';
import LoadedGltf from './LoadedGltf';
import { Html } from '@react-three/drei';

function App() {
  const canvasRef = useRef();
  const R3Scene = useRef();

  let { onxrloaded, cubeCamera } = XR8Scene(canvasRef, R3Scene);

  useEffect(() => {
    XRExtras.Loading.showLoading({ onxrloaded });
  }, []);

  const handleObjectClick = () => {
    // Handle object click event
    // This can be a placeholder for your object interaction logic
    console.log('Object clicked!');
  };

  const handleMenuClick = () => {
    // Handle menu click event
    // This can be a placeholder for your menu interaction logic
    console.log('Menu clicked!');
  };

  return (
    <div className="App">
      <Canvas style={{ position: 'absolute' }}>
        <scene ref={R3Scene}>
          <ambientLight />
          {/* <DreiRefraction envMap={cubeCamera.renderTarget.texture} /> */}
          <LoadedGltf onClick={handleObjectClick} />
          <pointLight position={[10, 15, 10]} />
        </scene>
        {/* Overlay HTML for UI elements */}
        <Html>
          <Menu onClick={handleMenuClick} />
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

function Menu({ onClick }) {
  return (
    <div className="menu">
      <button onClick={onClick}>Menu Item 1</button>
      <button onClick={onClick}>Menu Item 2</button>
      <button onClick={onClick}>Menu Item 3</button>
    </div>
  );
}

