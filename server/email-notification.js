require('dotenv/config');
const format = require('date-fns/format');
const { zonedTimeToUtc } = require('date-fns-tz');
const db = require('./db.js');
const sgMail = require('@sendgrid/mail');
const formatDistanceStrict = require('date-fns/formatDistanceStrict');
const { utcToZonedTime } = require('date-fns-tz');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const checkTime = time => {
  if (time === '6 hours' || time === '5 hours' || time === '4 hours' || time === '3 hours' || time === '2 hours' || time === '1 hours' || time === '0 hours') return true;
  return false;
};

const todayUTC = zonedTimeToUtc(format(new Date(), 'yyyy-MM-dd HH'), Intl.DateTimeFormat().resolvedOptions().timeZone);
const sql = `
    select "title",
           "description",
           "timestamp",
           "origin",
           "destination",
           "notification",
           "sent",
           "email",
           "eventId"
      from "events"
     where "userId" = $1
  `;
const params = [1];
db.query(sql, params)
  .then(result => {
    const { rows } = result;
    const eventList = rows.filter(event => {
      if (checkTime(formatDistanceStrict(event.timestamp, todayUTC, { unit: 'hour' })) && !event.sent) return true;
      return false;
    });
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
