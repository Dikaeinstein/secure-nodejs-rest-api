# secure-nodejs-restful-api

A bare bones API using express, mongoose and mongodb.

It consist of a User model and controller. The model
defines the data, and the controller contains all
the business logic needed to interact with the database.

It has a db file which will be used to
connect the app to the database, and an app file used
for bootstrapping the application itself.

The auth folder contains the Authentication controller and configuration for registering and logging users in, signing and verifying tokens.

The server file is used to start the server and listens on a specific port.

## Run
To run locally:

```
git clone
npm i       // to install dependencies
```
Then create a .env file like the .env.sample file that contains all the necessary environment variables.

To start server:
```
npm start
```
