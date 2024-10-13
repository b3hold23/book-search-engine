const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookIs: ID!
        title: string!
        authors: [String]
        description: String!
        image: String!
        link: String!
    }
`