### Architecture of this project

Middelware <> Router <> Service <> Model <> BD (MongoLocalDB or MongoAtlasDB)
### Instaling Moongose ORM

For connect with Mongo DataBase we will use ORM Moongose,  first we need to add moongose to Node JS Project

~~~
yarn add mongoose
~~~
## Using Express Api
First we need to start our express aplication, we will use the command 

~~~
yarn start
~~~

# Testing API

First for test this some features api we need to have token authentication,

### Login

If we want to take the Login token, we will post into body request, the username, and password, the login will return a token for authenticate

![Postman](./images/login.png)

### Authentication

If we want to, post,get or delete a user we need to use the token for authenticate, in all requests we need to put the token.

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
