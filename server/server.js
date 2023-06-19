const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
