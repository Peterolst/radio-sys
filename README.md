A simple service for handling of devices in a radio system.

Pre-building run `npm install` from project root to install dependencies.
To build the application run `npm run build` from the project root.
To run the application run `npm start` from the project root.

In order to simplify run process I have pre-built and allowed git to track ALL files, including `dist` and `node_modules` (I wouldn't normally do this in a prod environment).

Steps to build and run in Docker:
1. `docker build . -t radio-sys`
2. `docker run -p 3000:3000 radio-sys`
(3.) Remember to kill or stop the container when you are done.

The solution includes a REST API implemented in Node.js (v10+), using Express.js. 
I have taken the freedom to add some additional routes, so the routes are now: 

* `GET /radios` Retrieves information of ALL devices
* `POST /radios/:id` Stores a radio profile. If a radio with that `id` already exists it will return an error
* `POST /radios:id/location` Set the location of device with `id`
* `GET /radios:id/location` Retrive the location of device with `id`
* `DELETE /radios` Clear all radaio profiles. Handy to reset data.

* `GET /` health check endpoint
* `POST /` health check endpoint

Data is persisted in a JSON file.
A MySQL library is imported and I have implemented a connector - MySQL runs great in Docker containers. 
Spinning MySQL up together with the application using `docker-compose` was my initial approach, but I went with the JSON due to the simplistic nature of the service. 
