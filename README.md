# MongoDB Explorer

MongoDB Explorer is a web app for exploring and managing your MongoDB databases and collections. You can directly visit the website (hosted in HerokuApp) [here]()

## Functionalities
- List all existent databases in a server.
- Select one database and then list all existing collections in it.
- Select one collection and show the first 20 records in chronological order.
- Create a new record.
- Update an existing record (out of the 20 shown).
- Delete an existing record (out of the 20 shown).

## Requirements
You need to have npm and mongodb installed on your computer to run this locally.

## Deployment
To run the project locally, download or git clone repository. Then, 
```
 # Install dependencies for server
 npm install
 
 #Set environment variables with your MongoDB credentials
 SET MONGO_USERNAME = "Here goes your username"
 SET MONGO_PASSWORD = "Here goes your password"
 SET MONGO_HOSTNAME = "Here goes your hostname"
 
 #run the project
 npm start
```
**It will deploy in:**
```
http://localhost:3000/
```
## Authors 

- [Mariana Rodríguez](https://mrodriguez21.github.io/) 👩‍💻

# MIT License 

This project is licensed by the MIT [License](https://github.com/mrodriguez21/mongo-explorer/blob/master/LICENSE).