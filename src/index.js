
const { ApolloServer, gql } = require('apollo-server')

//All request are POST
//All request access the same endpoint (/graphql)

//Query -> get information (GET)
//Mutation -> manipulate data (POST/PUT/PATCH/DELETE)
//Scalar Types -> String, Int, boolean, Float and ID



//All listed in the gql is a schema

//If the type is mandatory, add a (!) at thr end
const typeDefs = gql`
    type User {
        _id: ID!   # Unic identifier, primary key on graphql
        name: String!
        email: String!
        active: Boolean!
    }
    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }
    type Query {
        hello: String
        users: [User!]! #Array cant be null, neither user
        getUserByEmail(email: String!): User!
    }
    
    type Mutation {
        createUser(name: String!, email: String): User!
    }
`;

const users = [
    { _id: String(Math.random()), name: 'Mel1', email: 'mel1@teste.com', active: true },
    { _id: String(Math.random()), name: 'Mel2', email: 'mel2@teste.com', active: true },
    { _id: String(Math.random()), name: 'Mel3', email: 'mel3@teste.com', active: false }
]


//the resolver must match exactly what is written in the gql
const resolvers = {
    Query: {
        hello: () => 'hello world!',
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find(user => user.email === args.email)
        },
    },
    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                _id: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true,
            }
            users.push(newUser);
            return newUser;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`🔥 Server started at ${url}`));