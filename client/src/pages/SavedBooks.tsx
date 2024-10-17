import { Container, Card, Button, Row, Col } from 'react-bootstrap';
// import { deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import type { User } from '../models/User';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const SavedBooks = () => {
  // Use useQuery to get user data from the GraphQL server
  const { loading, error, data } = useQuery(GET_ME);

  // If loading, display loading message
  if (loading) return <p>Loading...</p>;

  // If there's an error, display the error message
  if (error) return <p>Error: {error.message}</p>;

  // Check if user data is available
  const userData: User = data?.me || {
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  };

  // Function to delete a book
  // Function to delete a book
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Execute the DELETE_BOOK mutation

      // Update user data by using the mutation result
      // Remove the book ID from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // Check if user has saved books
  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing {userData.username || 'saved books'}!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md='4' key={book.bookId}>
              <Card border='dark'>
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant='top'
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;