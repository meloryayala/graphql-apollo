
const { ApolloServer, gql } = require('apollo-server')

//All request are POST
//All request access the same endpoint (/graphql)

//Query -> get information (GET)
//Mutation -> manipulate data (POST/PUT/PATCH/DELETE)
//Scalar Types -> String, Int, boolean, Float and ID



//All listed in the gql is a schema

//If the type is not mandatory, add a (!) at thr end
const typeDefs = gql`
    type user {
        name: String!
        email: String!
        active: Boolean!
    }
    type Query {
        hello: String
    }
`;


//the resolver must match exactly what is written in the gql
const resolvers = {
    Query: {
        hello: () => 'hello world!'
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`🔥 Server started at ${url}`));