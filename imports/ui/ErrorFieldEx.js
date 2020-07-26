import React, { Component } from 'react';
import { ErrorField } from 'uniforms-semantic';

export default ErrorFieldEx = ({ name }) => (
  <ErrorField name={name} style={{ color: 'red', fontSize: '80%' }} />
);
