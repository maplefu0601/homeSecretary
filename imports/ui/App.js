import React, { useState } from 'react';
import { render } from 'react-dom';
import gql from 'graphql-tag';
import { withApollo, graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ResolutionForm from './ResolutionForm';
import TasksForm from './TasksForm';
import EventsForm from './EventsForm';
import TaskForm from './TaskForm';

const App = (props) => {
  console.log(props);
  const {
    loading,
    resolutions,
    users,
    tasks,
    events,
    client,
    user,
    updateTask,
    deleteTask,
  } = props;
  if (loading) {
    return null;
  }
  console.log(client, resolutions, users, tasks, events);
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [data, setData] = useState({});

  const updateData = (type, data) => {
    console.log(type, data);
    if (type === 'task') {
      setType('task');
    }
    if (type === 'event') {
      setType('event');
    }
    setData(data);
    setShow(true);
  };

  const deleteData = (type, data) => {
    console.log(type, data);
    deleteTask({ variables: { _id: data._id } }).then((data) => {
      console.log(data);
      alert(`${type} removed.`);
    });
  };

  const updateTaskData = (d) => {
    console.log(d);
    updateTask({
      variables: d,
    }).then((data) => handleClose());
  };

  const handleClose = () => setShow(false);
  const handleSave = (d) => {
    console.log(d);
  };
  return (
    <>
      <Row>
        <Col>
          <TasksForm
            data={tasks}
            updateData={updateData}
            deleteData={deleteData}
          />
        </Col>
        {/* <Col>
          <EventsForm data={events}></EventsForm>
        </Col> */}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {type}</Modal.Title>
        </Modal.Header>
        <TaskForm
          data={data}
          onSave={handleClose}
          updateTask={updateTaskData}
        />
      </Modal>
    </>
  );
};

const resolutionQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
    users {
      _id
      username
      email
      profile {
        name
      }
    }
    tasks {
      _id
      title
      content
      progress
      createdAt
      createdBy
      members
    }
    events {
      _id
      name
      content
      progress
      createdAt
      createdBy
      members
    }
  }
`;
const updateTaskMutation = gql`
  mutation updateTask(
    $_id: String!
    $title: String
    $content: String
    $progress: Float
    $members: String
  ) {
    updateTask(
      _id: $_id
      title: $title
      progress: $progress
      content: $content
      members: $members
    ) {
      _id
      title
      content
      progress
      members
    }
  }
`;

const deleteTaskMutation = gql`
  mutation deleteTask($_id: String!) {
    deleteTask(_id: $_id)
  }
`;

export default compose(
  graphql(resolutionQuery, {
    props: ({ data }) => ({ ...data }),
  }),
  graphql(updateTaskMutation, {
    name: 'updateTask',
  }),
  graphql(deleteTaskMutation, {
    name: 'deleteTask',
  }),
)(withApollo(App));
