import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';
import Resolutions from '../api/resolutions/resolutions';

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

class ResolutionForm extends Component {
  submitForm = () => {
    console.log(this.name.value);
    this.props
      .createResolution({
        variables: {
          name: this.name.value,
        },
      })
      .then((data) => {
        // this.props.refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.name = input)} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    );
  }
}

export default graphql(createResolution, {
  name: 'createResolution',
  options: { refetchQueries: ['Resolutions'] },
})(ResolutionForm);
