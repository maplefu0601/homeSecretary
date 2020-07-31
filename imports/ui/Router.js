import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';

// route components
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import EventForm from './EventForm';
import TaskForm from './TaskForm';
import App from './App';

const browserHistory = createBrowserHistory();

const isLoggedIn = () => {
  return Meteor.userId() !== null;
};

export const RenderRoutes = ({ client }) => (
  <Router history={browserHistory} client={client}>
    <Route
      exact
      path="/"
      render={(props) => (
        <App client={client} {...props} history={browserHistory}></App>
      )}
    />
    <Route
      exact
      path="/signup"
      render={(props) => (
        <RegisterForm
          client={client}
          {...props}
          history={browserHistory}
        ></RegisterForm>
      )}
    />
    {/* <Route exact path="/signin" component={LoginForm} /> */}
    <Route
      exact
      path="/signin"
      render={(props) =>
        isLoggedIn() ? (
          <Redirect to="/" />
        ) : (
          <LoginForm
            client={client}
            {...props}
            history={browserHistory}
          ></LoginForm>
        )
      }
    />
    <Route
      exact
      path="/tasks"
      render={(props) =>
        !isLoggedIn() ? (
          <Redirect to="/" />
        ) : (
          <TaskForm
            client={client}
            {...props}
            history={browserHistory}
          ></TaskForm>
        )
      }
    />
    <Route
      exact
      path="/events"
      render={(props) =>
        !isLoggedIn() ? (
          <Redirect to="/" />
        ) : (
          <EventForm
            client={client}
            {...props}
            history={browserHistory}
          ></EventForm>
        )
      }
    />
  </Router>
);
