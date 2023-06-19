import XR8Scene from './XR8Scene';
import { useRef, useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import LoadedGltf from './LoadedGltf';
import { Html } from '@react-three/drei';
import axios from 'axios';

function App() {
  const canvasRef = useRef();
  const R3Scene = useRef();
  const [modelIds, setModelIds] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [modelData, setModelData] = useState(null);
  const [furnitureModelIDs, setFurnitureModelIDs] = useState([]);

  useEffect(() => {
    XRExtras.Loading.showLoading();
    fetchFurnitureModels();
  }, []);

  const handleObjectClick = () => {
    console.log('Object clicked!');
  };

  const fetchFurnitureModels = async () => {
    const baseURL = 'https://api.sketchfab.com/v3/models';
    const searchEndpoint = '/search';
    const params = {
      type: 'models',
      category: 'furniture',
      sort_by: '-publishedAt',
      per_page: 10,
      page: 1,
    };

    try {
      const response = await axios.get(`${baseURL}${searchEndpoint}`, { params });
      const { results } = response.data;

      // Extract the furniture model IDs from the response
      const furnitureModelIDs = results.map((result) => result.uid);

      // Update the state with the fetched furniture model IDs
      setFurnitureModelIDs(furnitureModelIDs);
    } catch (error) {
      console.log('Error fetching furniture models:', error);
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

  return (
    <div className="App">
      {/* Render the furniture models */}
      <h1>Furniture Models:</h1>
      <ul>
        {furnitureModelIDs.map((modelId) => (
          <li key={modelId}>{modelId}</li>
        ))}
      </ul>
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
