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
  const [furnitureIds, setFurnitureIds] = useState([]);
  const [furnitureModelData, setFurnitureModelData] = useState([]);

  useEffect(() => {
    XRExtras.Loading.showLoading();
    fetchFurnitureIds();
  }, []);

  const handleObjectClick = () => {
    console.log('Object clicked!');
  };

  const fetchFurnitureIds = async () => {
    try {
      const response = await axios.get('/api/furniture');
      const furnitureIds = response.data;
  
      // Update the state with the fetched furniture model IDs
      setModelIds(furnitureIds);
  
      // Fetch furniture model data from Sketchfab API for each furniture ID
      const fetchModelDataPromises = furnitureIds.map(async (id) => {
        const modelResponse = await axios.get(`https://api.sketchfab.com/v3/models/${id}`);
        return modelResponse.data;
      });
  
      // Wait for all the model data requests to complete
      const modelDataArray = await Promise.all(fetchModelDataPromises);
  
      // Update the state with the fetched furniture model data
      setFurnitureModelData(modelDataArray);
    } catch (error) {
      console.log('Error fetching furniture model data:', error);
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
      <h1>Furniture Models:</h1>
      <ul>
        {furnitureModelData.map((model) => (
          <li key={model.uid}>{model.name}</li>
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
