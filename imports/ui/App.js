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
import EventForm from './EventForm';

let remindered = false;
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
    updateEvent,
    deleteEvent,
  } = props;
  if (loading) {
    return null;
  }
  localStorage.setItem('users', JSON.stringify(users));
  console.log(users, tasks, events);
  const [show, setShow] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [typeBusiness, setTypeBusiness] = useState('');
  const [dataBusiness, setDataBusiness] = useState({});

  const checkReminders = () => {
    let ret = { hasEvents: false, events: 0, tasks: 0, hasTasks: false };
    const loginUser = Meteor.userId();
    if (loginUser) {
      tasks.forEach((t) => {
        if (t.members.includes(loginUser) && t.progress < 1) {
          ret.hasTasks = true;
          ret.tasks++;
        }
      });
      events.forEach((e) => {
        if (e.members.includes(loginUser) && e.progress < 1) {
          ret.hasEvents = true;
          ret.events++;
        }
      });
    }

    return ret;
  };
  const reminders = checkReminders();
  if (!remindered && (reminders.hasTasks || reminders.hasEvents)) {
    setTimeout(() => setShowReminder(true), 1000);
  }

  const updateData = (type, data) => {
    console.log(type, data);
    if (type === 'task') {
      setTypeBusiness('task');
    }
    if (type === 'event') {
      setTypeBusiness('event');
    }
    setDataBusiness(data);
    setShow(true);
  };

  const deleteData = (type, data) => {
    console.log(type, data);
    if (type === 'task') {
      deleteTask({ variables: { _id: data._id } }).then((data) => {
        console.log(data);
        alert(`${type} removed.`);
      });
    }
    if (type === 'event') {
      deleteEvent({ variables: { _id: data._id } }).then((data) => {
        console.log(data);
        alert(`${type} removed.`);
      });
    }
  };

  const updateTaskData = (d) => {
    console.log(d);
    updateTask({
      variables: d,
    }).then((data) => handleClose());
  };

  const updateEventData = (d) => {
    console.log(d);
    updateEvent({
      variables: d,
    }).then((data) => handleClose());
  };

  const handleClose = () => setShow(false);
  const handleCloseReminder = () => {
    remindered = true;
    setShowReminder(false);
  };
  const handleSave = (d) => {
    console.log(d);
  };
  console.log(events);
  return (
    <>
      <Row>
        <Col>
          <TasksForm
            dataTasks={tasks}
            updateData={updateData}
            deleteData={deleteData}
          />
        </Col>
        <Col>
          <EventsForm
            dataEvents={events}
            updateData={updateData}
            deleteData={deleteData}
          ></EventsForm>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {typeBusiness}</Modal.Title>
        </Modal.Header>
        {typeBusiness === 'task' ? (
          <TaskForm
            data={dataBusiness}
            onSave={handleClose}
            updateTask={updateTaskData}
          />
        ) : (
          <EventForm
            data={dataBusiness}
            onSave={handleClose}
            updateEvent={updateEventData}
          />
        )}
      </Modal>
      <Modal show={showReminder} onHide={handleCloseReminder}>
        <Modal.Header closeButton>
          <Modal.Title>
            You have {reminders.events} event(s) and {reminders.tasks} task(s)
            haven't been accomplished.
          </Modal.Title>
        </Modal.Header>
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

const updateEventMutation = gql`
  mutation updateEvent(
    $_id: String!
    $name: String
    $content: String
    $progress: Float
    $members: String
  ) {
    updateEvent(
      _id: $_id
      name: $name
      progress: $progress
      content: $content
      members: $members
    ) {
      _id
      name
      content
      progress
      members
    }
  }
`;

const deleteEventMutation = gql`
  mutation deleteEvent($_id: String!) {
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
  graphql(updateEventMutation, {
    name: 'updateEvent',
  }),
  graphql(deleteEventMutation, {
    name: 'deleteEvent',
  }),
)(withApollo(App));
