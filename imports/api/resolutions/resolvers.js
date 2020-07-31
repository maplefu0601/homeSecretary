import Resolutions from './resolutions';

// Resolutions.insert({ name: 'Test res' });
// Resolutions.remove({ _id: 'iXwbnXareR6RYcSxd' });
const res = Resolutions.find({}).fetch();
// console.log(res);

export default {
  Query: {
    resolutions(obj, args, { user }) {
      console.log('context: ', obj, args, user);
      if (user) {
        const { _id } = user;
        return Resolutions.find({ userId: _id }).fetch();
      }
      return Resolutions.find({}).fetch();
    },
    users() {
      return this.users.find({}).fetch();
    },
  },

  Mutation: {
    createResolution(obj, { name }, { user }) {
      console.log('createResolution:', name, user);
      const resolutionId = Resolutions.insert({ name, userId: user._id });

      return Resolutions.findOne(resolutionId);
    },
  },
};
