import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';

import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import { AutoForm, AutoField, ErrorField } from 'uniforms-bootstrap4';

import EventSchema from './schema/event';
import ErrorFieldEx from './ErrorFieldEx';
import { getAllUsers } from '../api/utils';
import UsersForm from './UsersForm';

const createEvent = gql`
  mutation createEvent(
    $name: String!
    $content: String
    $progress: Float
    $createdBy: String
    $members: String
  ) {
    createEvent(
      name: $name
      content: $content
      progress: $progress
      createdBy: $createdBy
      members: $members
    ) {
      _id
    }
  }
`;

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = { showAlert: false, alertMessage: '' };
  }
  addUser(u) {
    console.log(u);
  }
  submitForm = (model) => {
    console.log(model, this.props);
    const { name, content, progress, members, createdBy } = model;
    this.props
      .createEvent({
        variables: {
          name,
          content,
          progress,
          members,
          createdBy,
        },
      })
      .then((data) => {
        this.setState({ showAlert: true, alertMessage: 'Event saved.' });
        this.formRef.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <Modal
            size="sm"
            show={this.state.showAlert}
            onHide={() => this.setState({ showAlert: false })}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Message
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.alertMessage}</Modal.Body>
          </Modal>
          <AutoForm
            schema={EventSchema}
            onSubmit={this.submitForm}
            ref={(ref) => {
              this.formRef = ref;
            }}
          >
            <Row>
              <Col>
                <AutoField name={'name'} />
                <ErrorFieldEx name={'name'} />

                <AutoField name={'content'} />
                <ErrorFieldEx name={'content'} />

                <AutoField name={'progress'} step={0.1} />
                <ErrorFieldEx name={'progress'} />

                <AutoField name={'members'} />
                {/* <UsersForm onSelectUser={this.addUser} /> */}

                <AutoField name={'createdBy'} />

                <Button variant="secondary" className="mt-3" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </AutoForm>
        </Col>
      </Row>
    );
  }
}

export default graphql(createEvent, {
  name: 'createEvent',
  options: { refetchQueries: ['Events'] },
})(EventForm);
