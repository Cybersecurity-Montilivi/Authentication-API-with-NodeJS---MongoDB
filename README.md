# Using ExpressJS with Docker MongoDB

### Configuring MongoDB with Docker
We will use the docker compose for build this image docker.

First step we will create the file *docker-compose.yml*

~~~~
version: '3.1'

services:

  mongo:
    image: mongo:4.2
    restart: always
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: admin
~~~~

After this we will start the container with docker-compose, the option -d is for put the container output in the background

~~~
docker-compose up -d
~~~

For knew if the docker container is runing we will do and give the **CONTAINER ID**

~~~
docker ps
~~~

When we run a container with mongo, docker automatically assign a ip addres to this container. We will use docker inspect for know the IP.

~~~~
docker inspect CONTAINER_ID | grep "IPAddress"
~~~~

When we know the IP Adress we will connect with a [mongosh](https://docs.mongodb.com/mongodb-shell/)

If we want to see the databases of MongoDB we need to autenticate with user that we put in *docker-compose.yml*
For [connect with mongosh](https://docs.mongodb.com/mongodb-shell/connect/#std-label-mdb-shell-connect) we need the docker container IP address

~~~~
mongosh "mongodb://<docker container ip>" --username <user admin> --password <password>
~~~~

After this we will do a show dbs, and we will see the 3 default databases.

~~~
show dbs
~~~

### Creating database user
Autenticated with mongoosh we will create a database users
~~~
use users
~~~

We need to stay connected with mongosh into a mongoDB. We will execute this command for create a user for this database

~~~~
db.createUser({ user: "superadmin", pwd: "superadmin", roles: [{ role: "readWrite", db: "users" }] })
~~~~

After this we will connect with this new user
~~~~
mongosh "mongodb://<docker container ip>" --username <user admin> --password <password> --authenticationDatabase users
~~~~

### Envoirment variables

We need to create a .env file, into this file we will put the configurations for connect to database

~~~~
MONGODB_USER= <user database>
MONGODB_PASSWORD= <password of user database>
MONGODB_HOST= <ip of the hosts that contains the container>
MONGODB_PORT= <port of mongodb>
MONGODB_DATABASE= <database>
~~~~

For collect variable envoirment from .env file
~~~
yarn add dotenv
~~~

### Instaling Moongose ORM

For connect with Mongo DataBase we will use ORM Moongose,  first we need to add moongose to Node JS Project

~~~
yarn add mongoose
~~~


## Post to Api

We will Post into url api with aJSON, we will use the Postman , we will go to POST action in Postman, and meny body, after we will select JSON type text.

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

