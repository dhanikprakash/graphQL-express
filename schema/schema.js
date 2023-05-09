const graphql = require('graphql')
const { GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema } = graphql;
//const _ = require('loadash')
const books = [
    {

        id: 5,
        name: "fugiat veniam minus",
        genre: "Sci-Fi",
        autherId: 1
    },
    {
        id: 2,
        name: "et porro tempora",
        genre: "Fantasy",
        autherId: 2
    },
    {

        id: 4,
        name: "laboriosam mollitia et enim quasi adipisci quia provident illum",
        genre: "Fantasy",
        autherId: 3
    },
    {

        id: 6,
        name: "Book 6",
        genre: "Sci-Fi",
        autherId: 1
    },
    {
        id: 7,
        name: "eBooks 7",
        genre: "Fantasy",
        autherId: 2
    },
    {

        id: 8,
        name: "Book 8",
        genre: "Fantasy",
        autherId: 3
    },
]
const authers = [
    {

        id: 1,
        name: "John",
        age: 33
    },
    {
        id: 2,
        name: "Tim",
        age: 44
    },
    {

        id: 3,
        name: "Collin",
        age: 50
    },
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        auther: {
            type: AutherType,
            resolve(parent, args) {
                return authers.find(x => x.id == parent.autherId);
            }
        }
    })
});

const AutherType = new GraphQLObjectType({
    name: 'Auther',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(x => x.autherId == parent.id)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to connect to db
                //return _.find(books, { id: args.id })
                return books.find(x => x.id == args.id)

            }
        },
        auther: {
            type: AutherType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authers.find(x => x.id == args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});