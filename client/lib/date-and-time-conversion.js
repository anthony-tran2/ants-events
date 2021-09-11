import { utcToZonedTime } from 'date-fns-tz';

export default function timestampConversion(timestamp) {
  const newDate = new Date(timestamp);
  const zonedDate = `${utcToZonedTime(newDate, Intl.DateTimeFormat().resolvedOptions().timeZone)}`;
  const dateArray = zonedDate.split(' ');
  const date = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
  const firstTwo = parseInt(dateArray[4][0] + dateArray[4][1]);
  const rest = dateArray[4].slice(2, 3);
  let time = null;
  if (firstTwo > 12) {
    time = `${firstTwo - 12}${rest} a.m.`;
  } else if (firstTwo === 0) {
    time = `${dateArray[4].slice(0, 5)} a.m.`;
  } else time = `${dateArray[4].slice(0, 5)} p.m.`;
  return {
    date,
    time
  };
}
