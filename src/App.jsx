import XR8Scene from './XR8Scene';
import { useRef, useEffect } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import LoadedGltf from './LoadedGltf';

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

          {/* Place your menu objects within the scene */}
          <MenuObject onClick={handleMenuClick} position={[0, 0, -5]} />

        </scene>
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

function MenuObject({ onClick, position }) {
  return (
    <mesh position={position} onClick={onClick}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

