const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

// const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Define the API route for fetching furniture model IDs
app.get('/api/furniture', (req, res) => {
  const baseURL = 'https://api.sketchfab.com/v3/models';
  const searchEndpoint = '/search';
  const params = {
    type: 'models',
    category: 'furniture',
    sort_by: '-publishedAt',
    per_page: 10,
    page: 1,
  };

  axios
    .get(`${baseURL}${searchEndpoint}`, { params })
    .then((response) => {
      const { results } = response.data;
      const furnitureModelIDs = results.map((result) => result.uid);
      res.json(furnitureModelIDs);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve furniture model IDs' });
    });
});

// Define the API route for fetching model data based on the model ID
app.get('/api/models/:modelId', async (req, res) => {
  const { modelId } = req.params;
  const apiUrl = `https://api.sketchfab.com/v3/models/${modelId}`;

  try {
    const response = await axios.get(apiUrl);
    const modelData = response.data;

    res.json(modelData);
  } catch (error) {
    res.status(404).json({ error: 'Model not found' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
