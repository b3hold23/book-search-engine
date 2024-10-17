import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                username
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String, $email: String, $password: String) {
        login(username: $username, email: $email, password: $password) {
            token
            user {
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($user: ID!, $book: ID!) {
        saveBook(user: $user, book: $book) {
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: ID!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;
