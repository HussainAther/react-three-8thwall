const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Define the API route for fetching model data based on the model ID
app.get('/api/models/:modelId', async (req, res) => {
  const { modelId } = req.params;

  try {
    const response = await axios.get(`https://api.sketchfab.com/v3/models/${modelId}`);
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

