const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        title: String!
        authors: [String]
        description: String!
        image: String!
        link: String!
    }

    type Query {
        getSingleUser(id: ID, username: String): User
        book(_id: String): [Book]
    }
    
    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        login(username: String, email: String, password: String): User
        saveBook(user: ID!, book: ID!): User
        deleteBook(user: ID!, book: ID!): User
    }
`
;
export default typeDefs;