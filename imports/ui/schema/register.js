import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

import SchemaBridge from './schemaBridge';

const RegisterSchema = new SimpleSchema({
  name: { type: String },
  email: { type: String },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
    custom() {
      if (this.value !== this.field('password').value) {
        return 'passwordMismatch';
      }
    },
  },
});

RegisterSchema.messageBox.messages({
  en: {
    passwordMismatch: 'Passwords do not match',
  },
});

const RegisterSchemaValidator = (model) => {
  console.log('model:', model);
  const error = {};

  if (!model.name) {
    error.name = 'Name is required';
  }

  if (!model.password) {
    error.password = 'Password is required';
  }
  if (model.password !== model.confirmPassword) {
    error.confirmPassword = 'Passwords mismatch';
  }

  if (Object.keys(error).length) {
    return error;
  }
};

// RegisterSchema.addValidator(RegisterSchemaValidator);

export default new SimpleSchema2Bridge(RegisterSchema);
