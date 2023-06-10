import XR8Scene from './XR8Scene';
import { useRef, useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import LoadedGltf from './LoadedGltf';
import { Html } from '@react-three/drei';

function App() {
  const canvasRef = useRef();
  const R3Scene = useRef();
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

  const handleModelIdChange = (e) => {
    setModelId(e.target.value);
  };

  useEffect(() => {
    // Fetch the model data when the modelId is provided
    const fetchModelData = async () => {
      try {
        const response = await fetch(`/api/models/${modelId}`);
        const data = await response.json();
        setModelData(data);
      } catch (error) {
        console.log('Error fetching model data:', error);
      }
    };

    if (modelId !== '') {
      fetchModelData();
    }
  }, [modelId]);

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
          <div className="menu">
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

