const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

function MongoUtils() {
  process.env.usuario = "Mariana";
  process.env.clave = "desarrollouniandes2020";
  const mu = {},
    uri = `mongodb+srv://${(process.env.usuario)}:${(process.env.clave)}@cluster0-h9ykn.mongodb.net/`,
    client = new MongoClient(uri, { useUnifiedTopology: true });

  // Connect
  mu.getDbs = () => {
    return client
      .connect()
      .then(client =>
        client
          .db()
          .admin()
          .listDatabases() // Returns a promise that will resolve to the list of databases
      )
      .finally(() => client.close());
  }

  return mu;
}

module.exports = MongoUtils();