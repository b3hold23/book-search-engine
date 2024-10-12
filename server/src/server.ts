import express from 'express';
// import { ApolloServer } from '@apollo/server';
import path from 'node:path';
import routes from './routes/index.js';

// import {typeDefs, resolvers} from './schemas/index.js';
import db from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 3001;
// cont server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const startApolloServer = async () => {
//   await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/graphql', server.getMiddleware(server));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
// };

// startApolloServer();
