const express = require('express');
const app = express();
const PORT = 5001;

app.get('/users/:id', (req, res) => {
    res.json({ id: req.params.id, name: "Karan" });
});

app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
