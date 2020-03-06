const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    uri = `mongodb+srv://${(process.env.username)}:${(process.env.password)}@${process.env.host}.mongodb.net/`;

  mu.connect = () =>
    new MongoClient(uri, { useUnifiedTopology: true })
      .connect()

  mu.getDbs = () =>
    mu.connect()
      .then(client =>
        client
          .db()
          .admin()
          .listDatabases() // Returns a promise that will resolve to the list of databases
          .finally(() => client.close())
      )

  mu.getCollections = (dbName) =>
    mu.connect()
      .then(
        client =>
          client
            .db(dbName)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
            .finally(() => client.close())
      )

  mu.getRecords = (dbName, colName, query) =>
    mu.connect()
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

  mu.createRecord = (dbName, colName, record) =>
    mu.connect()
      .then(client =>
        client
          .db(dbName)
          .collection(colName)
          .insertOne(record)
          .finally(() => client.close())
      )

  mu.updateRecord = (dbName, colName, query, update) =>
    mu.connect()
      .then(client =>
        client
          .db(dbName)
          .collection(colName)
          .updateOne(query, update)
          .finally(() => client.close())
      )

  mu.deleteRecord = (dbName, colName, query) =>
    mu.connect()
      .then(client =>
        client
          .db(dbName)
          .collection(colName)
          .deleteOne(query)
          .finally(() => client.close())
      )

  return mu;
}

module.exports = MongoUtils();