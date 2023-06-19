import express from 'express';
// import Sketchfab from 'sketchfab-api';
import axios from 'axios';

const app = express();
const PORT = 5500; // Choose the port you want to run the server on

app.listen(5500, () => {
  console.log('Server is running on port 5500');
});
app.get('/models', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get('https://api.sketchfab.com/v3/search/models', {
      params: {
        q: query,
        type: 'models',
        sort_by: '-publishedAt',
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

axios.get('https://api.sketchfab.com/v3/models')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
