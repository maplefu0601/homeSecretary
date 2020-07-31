import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const TaskSchema = new SimpleSchema({
  title: { type: String },
  content: {
    type: String,
  },
  progress: Number,
  members: String,
  createdBy: { type: String, defaultValue: Meteor.userId() },
});

export default new SimpleSchema2Bridge(TaskSchema);
