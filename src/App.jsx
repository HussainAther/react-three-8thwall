import XR8Scene from './XR8Scene';
import { useRef, useEffect, useState } from 'react'; // Add useState
import './App.css';
import { Canvas, useThree } from '@react-three/fiber'; // Add useThree
import { Html, useDetectGPU } from '@react-three/drei'; // Add Html and useDetectGPU

function App() {
  const canvasRef = useRef();
  const R3Scene = useRef();
  const [isMenuVisible, setMenuVisible] = useState(false); // State for menu visibility

  let { onxrloaded, cubeCamera } = XR8Scene(canvasRef, R3Scene);

  useEffect(() => {
    XRExtras.Loading.showLoading({ onxrloaded });
  }, []);

  const handleObjectClick = () => {
    // Handle object click event
    // This can be a placeholder for your object interaction logic
    console.log('Object clicked!');
  };

  const handleMenuButtonClick = () => {
    // Toggle menu visibility
    setMenuVisible(!isMenuVisible);
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
        {/* Display menu only if it's visible */}
        {isMenuVisible && (
          <Menu handleObjectClick={handleObjectClick} />
        )}
        {/* Overlay HTML for UI elements */}
        <Html>
          <button onClick={handleMenuButtonClick}>Toggle Menu</button>
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

function Menu({ handleObjectClick }) {
  // Menu component content
  return (
    <Html>
      <div style={{ position: 'absolute', top: '50px', left: '50px' }}>
        <h2>Menu</h2>
        <button onClick={handleObjectClick}>Interact with Object</button>
      </div>
    </Html>
  );
}

