import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { AutoForm, AutoField, ErrorField } from 'uniforms-semantic';

import RegisterSchema from './schema/register';

const ErrorFieldEx = ({ name }) => (
  <ErrorField name={name} style={{ color: 'red', fontSize: '80%' }} />
);

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  registerUser = (model) => {
    console.log(model);
    const { email, password, name } = model;

    Accounts.createUser(
      {
        email,
        password,
        username: email,
        profile: { name, email },
      },
      (error) => {
        if (error) {
          console.log(error);
        } else {
          this.props.client.resetStore();
          this.props.history.back();
        }
      },
    );
  };
  render() {
    return (
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <AutoForm schema={RegisterSchema} onSubmit={this.registerUser}>
            <Row>
              <Col>
                <AutoField name={'name'} />
                <ErrorFieldEx name={'name'} />

                <AutoField name={'email'} />
                <ErrorFieldEx name={'email'} />

                <AutoField name={'password'} type={'password'} />
                <ErrorFieldEx name={'password'} />

                <AutoField name={'confirmPassword'} type={'password'} />
                <ErrorFieldEx name={'confirmPassword'} />

                <Button variant="secondary" className="mt-3" type="submit">
                  Register User
                </Button>
              </Col>
            </Row>
          </AutoForm>
        </Col>
      </Row>
    );
  }
}
