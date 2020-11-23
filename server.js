import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import path from 'path';

import usersRouter from './routes/users';
import sessionsRouter from './routes/sessions';
import gratitudesRouter from './routes/gratitudes';
import configurePassport from './config/passport';

const app = express();

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('client/build'));
app.use(passport.initialize());
configurePassport(passport);

app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/gratitudes', gratitudesRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));