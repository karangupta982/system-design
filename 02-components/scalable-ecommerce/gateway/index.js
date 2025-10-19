const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/api/users/:id', async (req, res) => {
    const response = await axios.get(`http://localhost:5001/users/${req.params.id}`);
    res.json(response.data);
});

app.get('/api/products/:id', async (req, res) => {
    const response = await axios.get(`http://localhost:5002/products/${req.params.id}`);
    res.json(response.data);
});

app.get('/api/orders/:id', async (req, res) => {
    const response = await axios.get(`http://localhost:5003/orders/${req.params.id}`);
    res.json(response.data);
});

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
