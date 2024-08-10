const express = require('express');
const session = require('express-session');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
const passport = require('./config/passport');
const cors = require("cors");

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cors({ credentials: true, origin: "https://localhost:3000" }));

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Error connecting', err);
  })
sequelize.sync()
  .then(() => {
    console.log('Database models synced');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
