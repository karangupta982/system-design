// gateway/index.js
const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const { verifyJWT, generateAccessToken } = require('./utils/auth');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));

// basic rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120, // max requests per window per IP
  message: 'Too many requests from this IP, please try again later.',
});

// app.use('/api', limiter); // limits only routes starting with /api

app.use(limiter);


// multiple rate limiters example
// const authLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   max: 5, // Only 5 login attempts allowed
//   message: 'Too many login attempts. Try again in 10 minutes.',
// });

// app.use('/api/login', authLimiter);

// const generalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 200,
// });

// app.use('/api', generalLimiter);



// health & metrics
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/metrics', (req, res) => res.send('metrics-placeholder')); // integrate prom client later

// auth (demo token generator)
app.post('/auth/login', (req, res) => {
  // in prod: validate creds against user-service
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const token = generateAccessToken({ sub: userId });
  return res.json({ accessToken: token });
});

// proxy routes with JWT protect
app.get('/api/users/:id', verifyJWT, async (req, res, next) => {
  try {
    const r = await axios.get(`http://user-service:5001/users/${req.params.id}`);
    res.json(r.data);
  } catch (err) { next(err); }
});

app.get('/api/products/:id', verifyJWT, async (req, res, next) => {
  try {
    const r = await axios.get(`http://product-service:5002/products/${req.params.id}`);
    res.json(r.data);
  } catch (err) { next(err); }
});

// create order -> push to order service
app.post('/api/orders', verifyJWT, async (req, res, next) => {
  try {
    const r = await axios.post(`http://order-service:5003/orders`, req.body);
    res.status(201).json(r.data);
  } catch (err) { next(err); }
});

app.use((err, req, res, next) => {
  console.error(err?.response?.data || err.message || err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`API Gateway listening on ${PORT}`));














// const express = require('express');
// const axios = require('axios');
// const app = express();
// const PORT = 5000;

// app.use(express.json());

// app.get('/api/users/:id', async (req, res) => {
//     const response = await axios.get(`http://localhost:5001/users/${req.params.id}`);
//     res.json(response.data);
// });

// app.get('/api/products/:id', async (req, res) => {
//     const response = await axios.get(`http://localhost:5002/products/${req.params.id}`);
//     res.json(response.data);
// });

// app.get('/api/orders/:id', async (req, res) => {
//     const response = await axios.get(`http://localhost:5003/orders/${req.params.id}`);
//     res.json(response.data);
// });

// app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
