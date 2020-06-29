require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
});
