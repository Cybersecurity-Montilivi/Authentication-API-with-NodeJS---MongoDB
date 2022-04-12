### Architecture of this project

Middelware <> Router <> Service <> Model <> BD (MongoLocalDB or MongoAtlasDB)

### Yarn install

With this project, we use yarn to add all dependencies, first you need to be installed the nmp, and after we install yarn

~~~~
npm install --global yarn
~~~~

After you clone this repo, you need to add all the dependencies

~~~~
yarn install
~~~~

## Using Express Api
First we need to start our express application, we will use the command 

~~~
yarn start
~~~

## SETTING ENVIRONMENT VARIABLES
Here we have an example of .env, this file is so important to configure, we will put this file at the same directory as the app.js

The NodeJS API need the MONGODB_ENV= , because if you put PROD the API will build a string connection for connect to MongoDBAtlas, and if you put PRE the NodeJS API will construct a string for connect to local docker MongoDB. And you need set the JWT_SECRET

~~~~
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_HOST=
MONGODB_PORT=
MONGODB_DATABASE=
MONGODB_ENV=

JWT_SECRET=
~~~~

# Testing API

First for test this some features api we need to have token authentication,

### Login

If we want to take the Login token, we will post into body request, the username, and password, the login will return a token for authenticate

![Postman](./images/login.png)

### Authentication

If we want to, post, get or delete a user we need to use the token for authenticate, in all requests we need to put the token.

![Postman](./images/autentication.png)


### Post User

We will Post into url api with a JSON, we will use the Postman , we will go to POST action in Postman, and after we go to body request, we will select JSON type text.

![Postman](./images/postman.png)

~~~
{

"username": "user1",

"password": "passworduser1"

}
~~~

After we need to connect to BD users and see if the users is created

~~~~
mongosh "mongodb://<docker container ip>" --username superadmin --password superadmin --authenticationDatabase users
~~~~

~~~
use m03
~~~
~~~
db.users.find({})
~~~

### Get User
For get a specific user we will put on browser 

~~~
http://localhost:3000/<username>
~~~


### Delete User

For delete a user we will use DELETE request from postman, we will put the URL and a username of the user that we want to delete

![Postman](./images/postman2.png)

### Get all Users
For get the all users, we will put this command

~~~
http://localhost:3000/users
~~~