import Tasks from './tasks';

// Tasks.insert({ name: 'Test res' });
// Tasks.remove({ _id: 'iXwbnXareR6RYcSxd' });
const res = Tasks.find({}).fetch();

export default {
  Query: {
    tasks(obj, args, { user }) {
      console.log('getting tasks: ', obj, args, user);
      if (user) {
        const { _id } = user;
        return Tasks.find({ createdBy: _id }).fetch();
      }
      return Tasks.find({}).fetch();
    },
  },

  Mutation: {
    createTask(obj, data, { user }) {
      console.log('createTask:', obj, data, user);
      const { title, content, progress, createdBy, members } = data;
      const createdAt = new Date();
      const retId = Tasks.insert({
        title,
        content,
        progress,
        createdBy,
        members,
        createdAt,
      });

      return Tasks.findOne(retId);
    },

    updateTask(obj, data, { user }) {
      console.log('update task:', data);
      const { _id, title, content, progress, createdBy, members } = data;
      const ret = Tasks.update(
        { _id },
        { $set: { title, content, progress, createdBy, members } },
      );
      console.log('return:', ret);

      return Tasks.findOne({ _id });
    },

    deleteTask(obj, data, { user }) {
      console.log('delete task:', data);
      const { _id } = data;
      const ret = Tasks.remove({ _id });

      console.log(ret);
      return _id;
    },
  },
};
