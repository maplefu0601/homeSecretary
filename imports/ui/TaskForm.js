import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';

import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import { AutoForm, AutoField, ErrorField } from 'uniforms-bootstrap4';

import TaskSchema from './schema/task';
import ErrorFieldEx from './ErrorFieldEx';
import { getAllUsers } from '../api/utils';
import UsersForm from './UsersForm';

const createTask = gql`
  mutation createTask(
    $title: String!
    $content: String
    $progress: Float
    $createdBy: String
    $members: String
  ) {
    createTask(
      title: $title
      content: $content
      progress: $progress
      createdBy: $createdBy
      members: $members
    ) {
      _id
    }
  }
`;

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.props = props;

    this.state = {
      showAlert: false,
      alertMessage: '',
      data: props.data ? props.data : { members: '' },
      users: JSON.parse(localStorage.getItem('users')),
    };
  }
  addUser(u) {
    const { data } = this.state;
    console.log(u, data);
    if (!data.members.includes(u._id)) {
      if (data.members.length > 0) {
        data.members += `,${u._id}`;
      } else {
        data.members = u._id;
      }
      console.log('adding new members...', u._id, data);
      this.setState({ data });
    }
  }
  submitForm = (model) => {
    console.log(model, this.props);
    const { title, content, progress, members, createdBy } = model;
    if (this.props.hasOwnProperty('updateTask')) {
      model._id = this.props.data._id;
      this.props.updateTask(model);
    } else
      this.props
        .createTask({
          variables: {
            title,
            content,
            progress,
            members,
            createdBy,
          },
        })
        .then((data) => {
          this.setState({ showAlert: true, alertMessage: 'Task saved.' });
          this.formRef.reset();

          if (this.props.hasOwnProperty('onSave')) {
            this.props.onSave();
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  handleChange(e, name) {
    // console.log(e, name);
    const { data } = this.state;
    data[name] = e;
    this.setState({ data });
  }

  change(model) {
    // console.log(model);
    let data = model;

    this.setState({ data });
  }

  render() {
    const { title, content, progress, members, createdBy } = this.state.data;
    const { users } = this.state;

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
            schema={TaskSchema}
            onSubmit={this.submitForm}
            onChangeModel={(model) => this.change(model)}
            ref={(ref) => {
              this.formRef = ref;
            }}
          >
            <Row>
              <Col>
                <AutoField name={'title'} value={title} />
                <ErrorFieldEx name={'title'} />

                <AutoField name={'content'} value={content} />
                <ErrorFieldEx name={'content'} />

                <AutoField name={'progress'} step={0.1} value={progress} />
                <ErrorFieldEx name={'progress'} />

                <Row>
                  <Col>
                    <AutoField name={'members'} value={members} />
                  </Col>
                  <Col sm={2} style={{ marginTop: '-10px' }}>
                    <UsersForm
                      users={users}
                      onSelectUser={(u) => this.addUser(u)}
                    />
                  </Col>
                </Row>

                <AutoField name={'createdBy'} value={createdBy} />

                <Button
                  variant="secondary"
                  className="mt-3 mb-5 ml-10"
                  type="submit"
                >
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

export default graphql(createTask, {
  name: 'createTask',
  options: { refetchQueries: ['Tasks'] },
})(TaskForm);
