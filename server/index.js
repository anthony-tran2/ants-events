require('dotenv/config');
const express = require('express');
const db = require('./db.js');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const jsonMiddleware = express.json();
const userId = 1;

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.post('/api/events', (req, res, next) => {
  const { title, description, timestamp, origin, destination, coords, notification, email } = req.body;

  if (!title || !description || !timestamp || !destination || !coords) {
    throw new ClientError(400, 'title, description, timestamp, destination, coords are all required inputs');
  }

  const sql = `
    insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          returning *;
  `;
  const params = [title, description, timestamp, origin, destination, notification, 'false', email, userId, coords];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/events', (req, res, next) => {
  const sql = `
    select "eventId",
           "title",
           "description",
           "timestamp",
           "origin",
           "destination",
           "coords",
           "notification",
           "email"
      from "events"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/events/:eventId', (req, res, next) => {
  const eventId = parseInt(req.params.eventId, 10);
  if (!eventId) {
    throw new ClientError(400, 'eventId must be a positive integer');
  }
  const sql = `
    select "eventId",
           "title",
           "description",
           "timestamp",
           "origin",
           "destination",
           "coords",
           "notification",
           "email"
      from "events"
     where "userId" = $1 AND
           "eventId" = $2
  `;
  const params = [userId, eventId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) { throw new ClientError(404, 'invalid eventId. try again.'); }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/search/:keyword', (req, res, next) => {
  const keyword = req.params.keyword;
  const sql = `
    select "eventId",
           "title",
           "description",
           "timestamp",
           "origin",
           "destination",
           "coords",
           "notification",
           "email"
      from "events"
     where "userId" = $1 AND
           "title" ILIKE $2
  `;
  const params = [userId, `%${keyword}%`];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/events/:eventId', (req, res, next) => {
  const eventId = parseInt(req.params.eventId, 10);
  if (!eventId) {
    throw new ClientError(400, 'eventId must be a positive integer');
  }
  const { title, description, timestamp, origin, destination, coords, notification, email } = req.body;
  const sql = `
       update "events"
       set "email"        = $1,
           "title"        = $2,
           "description"  = $3,
           "timestamp"    = $4,
           "origin"       = $5,
           "destination"  = $6,
           "coords"       = $7,
           "notification" = $8
     where "userId" = $9 AND
           "eventId" = $10
    returning *;
  `;
  const params = [email, title, description, timestamp, origin, destination, coords, notification, userId, eventId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) { throw new ClientError(404, 'invalid eventId. try again.'); }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
