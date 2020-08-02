import Events from './events';

// Events.insert({ name: 'Test res' });
// Events.remove({ _id: 'iXwbnXareR6RYcSxd' });
const res = Events.find({}).fetch();

export default {
  Query: {
    events(obj, args, { user }) {
      console.log('context: ', obj, args, user);
      if (user) {
        const { _id } = user;
        return Events.find({ createdBy: _id }).fetch();
      }
      return Events.find({}).fetch();
    },
  },

  Mutation: {
    createEvent(obj, data, { user }) {
      console.log('createEvent:', obj, data, user);
      const { name, content, progress, createdBy, members } = data;
      const createdAt = new Date();
      const eventId = Events.insert({
        name,
        content,
        progress,
        createdBy,
        members,
        createdAt,
      });

      return Events.findOne(eventId);
    },

    updateEvent(obj, data, { user }) {
      console.log('updateEvent:', data);
      const { _id, name, content, progress, createdBy, members } = data;
      const createdAt = new Date();

      const ret = Events.update(
        { _id },
        { $set: { name, content, progress, createdBy, members } },
      );
      console.log('return: ', ret);

      return Events.findOne({ _id });
    },

    deleteEvent(obj, data, { user }) {
      console.log('delete event:', data);
      const { _id } = data;
      const ret = Events.remove({ _id });

      console.log(ret);
      return _id;
    },
  },
};
