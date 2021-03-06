require('dotenv/config');
const express = require('express');
const db = require('./db.js');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware.js');

const app = express();
const jsonMiddleware = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const sql = `
        insert into "firstTime" ("userId", "firstTime")
        values ($1, $2)
      `;
      const params = [result.rows[0].userId, true];
      db.query(sql, params);
      return result;
    })
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json(token);
        });
    })
    .catch(err => next(err));
});

app.get('/api/users/usernames', (req, res, next) => {
  const sql = `
        select "username"
        from "users"
      `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/events', (req, res, next) => {
  const { userId } = req.user;
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
  const { userId } = req.user;
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
  const { userId } = req.user;
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
  const { userId } = req.user;
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
  const { userId } = req.user;
  const eventId = parseInt(req.params.eventId, 10);
  if (!eventId) {
    throw new ClientError(400, 'eventId must be a positive integer');
  }
  const { title, description, timestamp, origin, destination, coords, notification, email } = req.body;
  const sql = `
       update "events"
       set "email"        = coalesce($1, "email"),
           "title"        = coalesce($2, "title"),
           "description"  = coalesce($3, "description"),
           "timestamp"    = coalesce($4, "timestamp"),
           "origin"       = coalesce($5, "origin"),
           "destination"  = coalesce($6, "destination"),
           "coords"       = coalesce($7, "coords"),
           "notification" = coalesce($8, "notification")
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

app.delete('/api/events/:eventId', (req, res, next) => {
  const { userId } = req.user;
  const eventId = parseInt(req.params.eventId, 10);
  if (!eventId) {
    throw new ClientError(400, 'eventId must be a positive integer');
  }
  const sql = `
    delete from "events"
          where "eventId" = $1 and
                "userId" = $2
                returning *
  `;
  const params = [eventId, userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) { throw new ClientError(404, 'invalid eventId. try again.'); }
      res.sendStatus(200);
    })
    .catch(err => next(err));
});

app.get('/api/users/firstTime', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
       select "firstTime"
       from "firstTime"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.patch('/api/users/firstTime', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
       update "firstTime"
       set "firstTime" = $1
       where "userId" = $2
    returning *;
  `;
  const params = [false, userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) { throw new ClientError(404, 'invalid userId. try again.'); }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
