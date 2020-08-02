import React from 'react';
import { render } from 'react-dom';
import gql from 'graphql-tag';
import { withApollo, graphql } from 'react-apollo';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const UsersForm = ({ onSelectUser, loading, users, client, user }) => {
  if (loading) {
    return null;
  }
  // console.log(client, users, user);
  return (
    <div style={{ float: 'right' }}>
      {users && (
        <div>
          <ul>
            <DropdownButton variant="secondary" title="Invite">
              {users.map((u) => (
                <Dropdown.Item
                  key={u._id}
                  userid={u._id}
                  onSelect={() => onSelectUser(u)}
                >
                  {u.profile.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </ul>
        </div>
      )}
    </div>
  );
};

const usersQuery = gql`
  query Users {
    users {
      _id
      username
      email
      profile {
        name
      }
    }
    user {
      _id
    }
  }
`;

export default graphql(usersQuery, {
  props: ({ data }) => ({ ...data }),
})(withApollo(UsersForm));
