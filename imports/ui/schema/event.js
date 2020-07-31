import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

import { getAllUsers } from '../../api/utils';

const EventSchema = new SimpleSchema(
  {
    name: { type: String },
    content: {
      type: String,
    },
    progress: Number,
    createdBy: { type: String, defaultValue: Meteor.userId() },
    members: { type: String },
  },
  {
    clean: {
      trimStrings: false,
    },
  },
);

export default new SimpleSchema2Bridge(EventSchema);
