const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//environment variable
env.config();

//routes
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');

// mongodb connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.obc5j.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log('Database connected');
  });
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(express.json());

//setting up routes
app.use('/api', authRoutes);
app.use('/api', expenseRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
