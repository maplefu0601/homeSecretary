import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withApollo } from 'react-apollo';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { AutoForm, AutoField, ErrorField } from 'uniforms-semantic';

import LoginSchema from './schema/login';
import ErrorFieldEx from './ErrorFieldEx';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
  }
  login = (model) => {
    // console.log(model);
    const { email, password } = model;

    Meteor.loginWithPassword(
      email,
      password,

      (error) => {
        if (error) {
          console.log(error);
        } else {
          this.props.client.resetStore();
          let url = Meteor.absoluteUrl('');
          console.log(url);
          this.props.history.go('/');
          setTimeout(() => {
            this.props.history.replace('/');
          });
        }
      },
    );
  };
  render() {
    return (
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <AutoForm schema={LoginSchema} onSubmit={this.login}>
            <Row>
              <Col>
                <AutoField name={'email'} />
                <ErrorFieldEx name={'email'} />

                <AutoField name={'password'} type={'password'} />
                <ErrorFieldEx name={'password'} />

                <Button variant="secondary" className="mt-3" type="submit">
                  Login
                </Button>
              </Col>
            </Row>
          </AutoForm>
        </Col>
      </Row>
    );
  }
}
