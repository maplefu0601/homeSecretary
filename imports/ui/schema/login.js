import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const LoginSchema = new SimpleSchema({
  email: { type: String },
  password: {
    type: String,
  },
});

export default new SimpleSchema2Bridge(LoginSchema);
