require('dotenv/config');
const format = require('date-fns/format');
const db = require('./db.js');
const sgMail = require('@sendgrid/mail');
const { utcToZonedTime } = require('date-fns-tz');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sql = `
    select "title",
           "description",
           "timestamp",
           "origin",
           "destination",
           "email",
           "eventId"
      from "events"
     where "sent" = false and
     "notification" = true and
     EXTRACT(hour from age(timestamp, current_timestamp)) <= '06' and
EXTRACT(hour from age(timestamp, current_timestamp)) >= '00';
  `;
db.query(sql)
  .then(result => {
    const { rows: eventList } = result;
    eventList.forEach(event => {
      const { email, title, description, timestamp, destination, origin, eventId } = event;
      const newDate = new Date(timestamp);
      const zonedDate = utcToZonedTime(newDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
      const date = format(zonedDate, 'MM/dd/yyyy');
      const time = format(zonedDate, 'hh:mm aaaa');
      const msg = {
        to: email,
        from: 'AntsEvents@ants-events.com',
        subject: 'Event Notification',
        text: 'You have an event today!',
        html: `
        <h2>You have an event today on ${date} starting at ${time} at ${destination}${origin ? ` coming from ${origin}` : ''}.</h2>
        <h3> ${title} </h3>
        <p>${description}</p>
    `
      };
      sgMail.send(msg)
        .then(() => {
          const sql2 = `
          update "events"
             set "sent" = $1
            where "eventId" = $2
          `;
          const params2 = [true, eventId];
          db.query(sql2, params2)
            .then()
            .catch(err => console.error(err));
        })
        .catch(error => console.error(error));
    });
  })
  .catch(err => console.error(err));
