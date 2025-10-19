const express = require('express');
const app = express();
const PORT = 5002;

app.get('/products/:id', (req, res) => {
    res.json({ id: req.params.id, name: "Laptop", price: 1200 });
});

app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
