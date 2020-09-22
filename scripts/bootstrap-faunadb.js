const faunadb = require('faunadb')
const q = faunadb.query

console.log('Creating your FaunaDB Database...\n')

if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log("Environment variable FAUNADB_SERVER_SECRET not set.");
  return;
}
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

createEventsCollection()
  .then(() => {
    console.log('Events collection created')
  });

createRatingsCollection()
  .then(() => {
    console.log('Ratings collection created')
  })

/* idempotent operation */
function createEventsCollection() {
  console.log('Creating Events collection')

  return client.query(q.CreateCollection({ name: "insights_events" }))
    .catch((e) => {
      // Database already exists
      if (e.requestResult.statusCode === 400 && e.message === 'instance not unique') {
        console.log('Events collection already exists')
        throw e
      }
    })
}

function createRatingsCollection() {
  console.log('Creating Ratings collection')

  return client.query(q.CreateCollection({ name: "ratings" }))
    .then(() => {
      return client.query(
        q.CreateIndex({
          name: "ratings",
          source: q.Collection("ratings"),
          terms: [
            { field: ['data', 'target'] }
          ]
        }))
    })
    .catch((e) => {
      // Database already exists
      if (e.requestResult.statusCode === 400 && e.message === 'instance not unique') {
        console.log('Ratings collection already exists')
        throw e
      }
    })
}