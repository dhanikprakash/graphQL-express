const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
var { graphql, buildSchema } = require("graphql")
var server = express();



server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


server.listen(4000, () => {
  console.log("Now listening on port 4000");
});



// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `)

// var rootValue = { hello: () => "Hello world!" }

// var source = "{ hello }"

// graphql({ schema, source, rootValue }).then(response => {
//   console.log(response)
// })