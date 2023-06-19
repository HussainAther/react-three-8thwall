const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000; // Choose the port you want to run the server on

app.get('/models', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get('https://api.turbosquid.com/v1/catalogs/search', {
      params: {
        q: query,
        format: 'json',
        count: 10, // Limit the number of results if desired
      },
      headers: {
        'X-API-Key': 'YOUR_TURBOSQUID_API_KEY', // Replace with your TurboSquid API key
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

