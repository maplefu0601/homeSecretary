export default {
  Query: {
    user(obj, args, { user }) {
      // console.log('user context: ', obj, args, user);
      return user || {};
    },
    users() {
      // console.log('getting users:');
      return Meteor.users.find({}).fetch();
    },
  },
  User: {
    email: (user) => {
      // console.log('user:', user);
      return user.emails[0].address;
    },
  },
};
