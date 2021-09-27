# Ant's Events  

A web application for forgetful people who want to keep track of their events.  

I built this application because I am a very forgetful person so I wanted to build an app that helps me keep track of all the events I have going on in my life. It would be a real pain though to have to go to the application all the time to check when your events are so in accordance to one of the three greate virtues of a good programmer, laziness, I set up automatic email notifications that the user can opt in to if they so desire.  

[Live Demo](https://ants-events.herokuapp.com/)  

https://user-images.githubusercontent.com/85326711/134958997-4a313dbf-3655-443a-a9de-34af8e6cbefb.mp4

https://user-images.githubusercontent.com/85326711/134959012-cc7b78a2-6e78-4908-a331-b5e886b3d1cb.mp4

![Screen Shot 2021-09-27 at 11 10 17 AM](https://user-images.githubusercontent.com/85326711/134962456-c295dae0-6317-4227-8724-1261530d8ea1.png)

## Technologies Used  
* The front-end client was built using **React** and **Material UI**  
* The client communicates with the server through **fetch** requests  
* The server was set up using **Node.js** and **Express**  
* Registration, Authentication, and Authorzation was performed via **Argon2** and **JSON Web Tokens**  
* A **PostgreSQL** database was used to store users and their event data  
* Email notifications were sent to users via the **SendGrid v3 Web API**  
* Directions and markers were displayed on a map using the **Google Maps JavaScript API**  
                
## Features  
* User can can create an event  
* User can view their events  
* User can search through their events  
* User can get email notifications for their events  
* User can get directions to a place for their events  
* User can edit events  
* User can delete events  
* User can register for an account  
* User can sign in and out of their accounts  

## Future Features
* User can create notes
* User can view and edit their notes
* User can delete their notes
  
## System Requirements
* PostgreSQL
* Node.js
  
## Instructions For Set Up
  1. After cloning the repository, install dependencies using `npm i`
  2. Make a copy of the **.env.example** file by running the command `cp .env .env.example`
  3. Fill in its required values **API Key for the __Google Maps API__ and the __SendGrid API__ are __required__**
  4. Run `npm run db:import` to create and initialize your database
  5. Run `npm run build` to compile your client
  6. Once it is finished compiling you can view the app in your browser using `localhost:3000`
  
