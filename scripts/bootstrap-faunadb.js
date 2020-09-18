const faunadb = require('faunadb')
const q = faunadb.query

console.log('Creating your FaunaDB Database...\n')

if (process.env.FAUNADB_SERVER_SECRET) {
  createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
    console.log('Database created')
  })
}

/* idempotent operation */
function createFaunaDB(key) {
  console.log('Create the database!')
  const client = new faunadb.Client({
    secret: key
  });

  /* Based on your requirements, change the schema here */
  return client.query(q.Create(q.Ref("classes"), { name: "insights_events" }))
    .then(()=>{
      return client.query(
        q.Create(q.Ref("indexes"), {
          name: "all_events",
          source: q.Ref("classes/insights_events")
        }))
    }).catch((e) => {
      // Database already exists
      if (e.requestResult.statusCode === 400 && e.message === 'instance not unique') {
        console.log('DB already exists')
        throw e
      }
    })
}