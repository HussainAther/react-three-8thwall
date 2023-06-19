import XR8Scene from './XR8Scene';
import { useRef, useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import LoadedGltf from './LoadedGltf';
import { Html } from '@react-three/drei';

function App() {
  const canvasRef = useRef();
  const R3Scene = useRef();
  const [modelIds, setModelIds] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    XRExtras.Loading.showLoading();
    fetchModelIds();
  }, []);

  const handleObjectClick = () => {
    console.log('Object clicked!');
  };

  const fetchModelIds = async () => {
    try {
      const response = await fetch('/api/furniture');
      const data = await response.json();
      setModelIds(data);
    } catch (error) {
      console.log('Error fetching model IDs:', error);
    }
  };

  const handleModelIdChange = (e) => {
    setSelectedModelId(e.target.value);
  };

  const fetchModelData = async () => {
    try {
      const response = await fetch(`/api/models/${selectedModelId}`);
      const data = await response.json();
      setModelData(data);
    } catch (error) {
      console.log('Error fetching model data:', error);
    }
  };

  useEffect(() => {
    if (selectedModelId !== '') {
      fetchModelData();
    }
  }, [selectedModelId]);

  return (
    <div className="App">
      <Canvas style={{ position: 'absolute' }}>
        <scene ref={R3Scene}>
          <ambientLight />
          {modelData && <LoadedGltf onClick={handleObjectClick} modelData={modelData} />}
          <pointLight position={[10, 15, 10]} />
        </scene>
        <Html>
          <div className="menu">
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <select value={selectedModelId} onChange={handleModelIdChange}>
                <option value="">Select a model</option>
                {modelIds.map((modelId) => (
                  <option key={modelId} value={modelId}>
                    {modelId}
                  </option>
                ))}
              </select>
              <button type="submit" onClick={fetchModelData} disabled={!selectedModelId}>
                Fetch Model
              </button>
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
