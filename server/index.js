require('dotenv/config');
const express = require('express');
const db = require('./db.js');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const jsonMiddleware = express.json();
const notification = false;
const userId = 1;

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.post('/api/events', (req, res, next) => {
  const { title, description, timestamp, origin, destination, email } = req.body;

  if (!title || !description || !timestamp || !destination) {
    throw new ClientError(400, 'title, description, timestamp, destination are all required inputs');
  }

  const sql = `
    insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "email", "userId")
          values ($1, $2, $3, $4, $5, $6, $7, $8)
          returning *;
  `;
  const params = [title, description, timestamp, origin, destination, notification, email, userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
