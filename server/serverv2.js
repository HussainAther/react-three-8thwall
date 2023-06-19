import express from 'express';
import axios from 'axios';

const app = express();
const port = 4000;

// Server file used for RESTful API with Wayfair (wayfair)

// Define an API endpoint for fetching 3D models from the Wayfair API
app.get('/api/models', async (req, res) => {
  try {
    const { searchTerm } = req.query;

    // Make a request to the Wayfair API to retrieve the 3D models
    const response = await axios.get('https://api.wayfair.com/v1/3dapi/models', {
      params: {
        term: searchTerm,
      },
    });

    // Extract the relevant data from the API response
    const models = response.data.models;

    // Return the models as a JSON response
    res.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'An error occurred while fetching models.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

