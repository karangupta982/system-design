const express = require('express');
const app = express();
const PORT = 5003;

app.get('/orders/:id', (req, res) => {
    res.json({ id: req.params.id, product: "Laptop", quantity: 1 });
});

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
