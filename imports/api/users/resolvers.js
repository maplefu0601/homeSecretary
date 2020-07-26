export default {
  Query: {
    user(obj, args, { user }) {
      // console.log('user context: ', obj, args, user);
      return user || {};
    },
  },
  User: {
    email: (user) => {
      console.log('user:', user);
      return user.emails[0].address;
    },
  },
};
