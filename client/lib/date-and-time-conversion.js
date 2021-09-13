import { utcToZonedTime } from 'date-fns-tz';
import format from 'date-fns/format';

export default function timestampConversion(timestamp) {
  const newDate = new Date(timestamp);
  const zonedDate = utcToZonedTime(newDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
  const date = format(zonedDate, 'MM/dd/yyyy');
  const time = format(zonedDate, 'hh:mm aaaa');
  return {
    date,
    time
  };
}
