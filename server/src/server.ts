import express from 'express';
import { ApolloServer } from '@apollo/server';
import path from 'path';
import { fileURLToPath } from 'url';
// import routes from './routes/index.js';

import {typeDefs, resolvers} from './schemas/index.js';
import db from './config/connection.js';
import { expressMiddleware } from '@apollo/server/express4';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

db.on('error', console.error.bind(console, 'connection error:'));

app.listen(PORT, () => {
  console.log(`🌍 Now listening on localhost:${PORT}`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
};

startApolloServer();
