import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  faHome,
  faCalendarAlt,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import App from '../../ui/App';
import { RenderRoutes } from '../../ui/Router';

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql'),
});

const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken();
  operation.setContext(() => ({
    headers: {
      authorization: token,
    },
  }));
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache,
});
console.log('User loggedIn:', Meteor.userId() !== null);

const ApolloApp = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn && Meteor.userId() !== null) {
    setLoggedIn(true);
  }
  console.log(Meteor.userId(), loggedIn);
  const LoginNav = () => (
    <Nav>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
      {!loggedIn ? (
        <Nav.Link href="/signin">Sign In</Nav.Link>
      ) : (
        <Button
          variant="secondary"
          onClick={() => {
            Meteor.logout();
            client.resetStore();
          }}
        >
          Logout
        </Button>
      )}
    </Nav>
  );

  return (
    <ApolloProvider client={client}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faHome} />
          Home Secretary
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link href="/events">
            <FontAwesomeIcon icon={faCalendarAlt} />
            Events
          </Nav.Link>
          <Nav.Link href="/tasks">
            <FontAwesomeIcon icon={faTasks} />
            Tasks
          </Nav.Link>
        </Nav>
        <LoginNav />
      </Navbar>
      <RenderRoutes client={client}></RenderRoutes>
    </ApolloProvider>
  );
};

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
