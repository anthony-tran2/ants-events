insert into "users" ("username", "hashedPassword")
values ('demouser', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into "firstTime" ("userId", "firstTime")
values(1, 'true');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Coding Bootcamp',
'I have been going here every day for the past two and a half months to learn how to code.',
'2021-09-24 10:30:00',
'401 Newport Center Dr, Newport Beach, CA 92660',
'9200 Irvine Center Dr #200, Irvine, CA 92618',
'true',
'false',
'grimmerravenn@gmail.com',
1,
'{"originCoords":{"lat":33.8823476,"lng":-117.8851033},"destinationCoords":{"lat":33.6348748,"lng":-117.7404808}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Car Repairs',
'Repairing my car',
'2021-10-04 00:13:00',
'',
'131 E 1st St, Tustin, CA 92780, USA',
'false',
'false',
'',
1,
'{"originCoords":null,"destinationCoords":{"lat":33.746004,"lng":-117.8232689}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Beach Day',
'Hanging out at the beach with friends!',
'2021-10-09 19:00:00',
'Garden Grove, CA, USA',
'Huntington Beach Pier, Huntington Beach, CA 92648, USA',
'false',
'false',
'',
1,
'{"originCoords":{"lat":33.7742692,"lng":-117.9379952},"destinationCoords":{"lat":33.6552063,"lng":-118.0040619}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Anniversary',
'4 year anniversary with my girlfriend!',
'2021-10-13 07:00:00',
'',
'Signal Hill, CA, USA',
'true',
'false',
'grimmerravenn@gmail.com',
1,
'{"originCoords":null,"destinationCoords":{"lat":33.8044614,"lng":-118.1678456}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Meetup with Employer',
'Meeting up with an employer to get advice on my applications and resume',
'2021-10-03 15:00:00',
'Garden Grove, CA, USA',
'16051 A, Brookhurst St Suite A, Fountain Valley, CA 92708, USA',
'false',
'false',
'',
1,
'{"originCoords":{"lat":33.7742692,"lng":-117.9379952},"destinationCoords":{"lat":33.729584,"lng":-117.95495}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Phone Screening',
'Phone Screening Interview with a hiring manager',
'2021-10-05 16:00:00',
'',
'11200 Stanford Ave, Garden Grove, CA 92840, USA',
'false',
'false',
'',
1,
'{"originCoords":null,"destinationCoords":{"lat":33.7773333,"lng":-117.9373333}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Morning Gym Sesh',
'Meeting up with old cohort mate from coding bootcamp to get fit together!',
'2021-10-09 13:30:00',
'Garden Grove, CA, USA',
'11881 Del Amo Blvd, Cerritos, CA 90703, USA',
'false',
'false',
'',
1,
'{"originCoords":{"lat":33.7742692,"lng":-117.9379952},"destinationCoords":{"lat":33.84678299999999,"lng":-118.080392}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Continue Job Search',
'Continue applying for jobs',
'2021-10-04 15:30:00',
'',
'9200 Irvine Center Dr #200, Irvine, CA 92618, USA',
'false',
'false',
'',
1,
'{"originCoords":null,"destinationCoords":{"lat":33.6348748,"lng":-117.7404808}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Record Demo Video',
'Record demo video after making changes to final project',
'2021-10-03 21:53:00',
'',
'Garden Grove, CA, USA',
'false',
'false',
'',
1,
'{"originCoords":null,"destinationCoords":{"lat":33.7742692,"lng":-117.9379952}}');

insert into "events" ("title", "description", "timestamp", "origin", "destination", "notification", "sent", "email", "userId", "coords")
values ('Demo Day!',
'Presenting application to employers',
'2021-10-07 01:00:00',
'Garden Grove, CA, USA',
'9200 Irvine Center Dr #200, Irvine, CA 92618, USA',
'true',
'false',
'grimmerravenn@gmail.com',
1,
'{"originCoords":{"lat":33.7742692,"lng":-117.9379952},"destinationCoords":{"lat":33.6348748,"lng":-117.7404808}}');
