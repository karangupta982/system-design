const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');

const MONGO = process.env.MONGO_URI;
const PORT = 5001;
const app = express();

app.use(bodyParser.json());

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('User DB connected'))
  .catch(e => console.error('User DB err', e));

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id).lean().exec();
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json(user);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.listen(PORT, () => console.log(`User service listening on ${PORT}`));
