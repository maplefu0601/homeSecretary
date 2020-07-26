import React from 'react';
import { render } from 'react-dom';
import gql from 'graphql-tag';
import { withApollo, graphql } from 'react-apollo';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ResolutionForm from './ResolutionForm';

const App = ({ loading, resolutions, client, user }) => {
  if (loading) {
    return null;
  }
  console.log(client, resolutions, user);
  return (
    <div>
      <ResolutionForm></ResolutionForm>
      {resolutions && (
        <div>
          <ul>
            {resolutions.map((resolution) => (
              <li key={resolution._id}>{resolution.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const resolutionQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
    user {
      _id
    }
  }
`;

export default graphql(resolutionQuery, {
  props: ({ data }) => ({ ...data }),
})(withApollo(App));
