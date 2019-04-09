import React, { Component } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { createUser } from '../../thunks/createUser';
import { connect } from 'react-redux';

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      program: '',
      module: ''
    }
  }

  checkDropdowns = () => {
    const { program, module } = this.state;
    return !program || !module;
  };

  handleOptionChange = event => {
    let { value, name } = event.target;
    name = name.toLowerCase();
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, image, firebaseID } = this.props;
    const { module, program } = this.state;
    const user = { name, email, image, firebaseID, module, program };
    await this.props.createUser(user);
  };

  render() {
    return (
      <div>
        <Dropdown
          options={['FE', 'BE']}
          label='Program'
          handleOptionChange={this.handleOptionChange}
        />
        <Dropdown
          options={[1, 2, 3, 4]}
          label='Module'
          handleOptionChange={this.handleOptionChange}
        />
        <button
          onClick={this.handleSubmit}
          disabled={this.checkDropdowns()}
        >
          submit
        </button>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(createUser(user))
});

export default connect(null, mapDispatchToProps)(Profile);