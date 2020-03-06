const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

function MongoUtils() {
  const mu = {},
    uri = `mongodb+srv://${(process.env.usuario)}:${(process.env.clave)}@cluster0-h9ykn.mongodb.net/`;

  mu.getDbs = () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
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

  mu.getCollections = (dbName) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    return client
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
      )
      .finally(() => client.close());
  }

  mu.getRecords = (dbName, colName, query) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    return client
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .collection(colName)
            .find(query)
            .limit(20)
            .sort({ timestamp: -1 })
            .toArray()
            .finally(() => client.close())
      )
  }

  return mu;
}

module.exports = MongoUtils();