import { ApolloServer, gql } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionsResolvers from '../../api/resolutions/resolvers';
import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';
import EventSchema from '../../api/events/Events.graphql';
import EventResolvers from '../../api/events/resolvers';
import TaskSchema from '../../api/tasks/Tasks.graphql';
import TaskResolvers from '../../api/tasks/resolvers';

//kissss
//aaadff
const testSchema = gql`
  type Query {
    hi: String
    resolutions: [Resolution]
    users: [User]
  }
`;
const typeDefs = [
  testSchema,
  ResolutionsSchema,
  UsersSchema,
  EventSchema,
  TaskSchema,
];

const testResolvers = {
  Query: {
    hi() {
      return 'Hello Hi Test';
    },
  },
};

const resolvers = merge(
  testResolvers,
  ResolutionsResolvers,
  UsersResolvers,
  EventResolvers,
  TaskResolvers,
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization),
  }),
});

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end();
  }
});
