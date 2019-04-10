import React, { Component } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { createUser } from '../../thunks/createUser';
import { connect } from 'react-redux';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || '',
      email: this.props.email || '',
      program: '',
      module: '',
      pronouns: '',
      slack: '',
      skill1: '',
      skill2: ''
    };
  }

  checkDropdowns = () => {
    const { program, module, email, name, pronouns, slack } = this.state;
    return !program || !module || !email || !name || !pronouns || !slack;
  };

  handleChange = event => {
    let { value, name } = event.target;
    name = name.toLowerCase();
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { image, firebaseID } = this.props;
    const {
      module,
      program,
      name,
      email,
      pronouns,
      slack,
      skill1,
      skill2
    } = this.state;
    let pronounsToSave = pronouns;

    if ( pronouns === 'prefer not to answer' ) {
      pronounsToSave = '';
    }

    const user = {
      name,
      email,
      image,
      firebaseID,
      module,
      program,
      pronouns: pronounsToSave,
      slack,
      skill1,
      skill2
    };
    await this.props.createUser(user);
  };

  render() {
    const { name, slack, email } = this.state;
    const skills = [
      'grid',
      'flexbox',
      'mythical creatures',
      'react',
      'jsFun',
      'rspec',
      'rails',
      'ruby',
      'jest/enzyme',
      'docker',
      'lightning talks',
      'javascript',
      'css',
      'active record',
      'SQL',
      'sinatra'
    ];
    return (
      <form onSubmit={this.handleSubmit} className='Profile--form'>
        <h3>Please complete your profile</h3>
        <div className='Profile--div--flex'>
          <label htmlFor='name'>Provide your name</label>
          <input value={name} name='name' onChange={this.handleChange} />
          <label htmlFor='email'>Provide your email</label>
          <input value={email} name='email' onChange={this.handleChange} />
          <label htmlFor='slack'>Provide your slack handle</label>
          <input value={slack} name='slack' onChange={this.handleChange} />
        </div>
        <Dropdown
          options={[
            'she/her',
            'he/him',
            'they/them',
            'ze/zir',
            'prefer not to answer'
          ]}
          label='Pronouns'
          handleChange={this.handleChange}
        />
        <Dropdown
          options={['FE', 'BE']}
          label='Program'
          handleChange={this.handleChange}
        />
        <Dropdown
          options={[1, 2, 3, 4]}
          label='Module'
          handleChange={this.handleChange}
        />
        <Dropdown
          options={skills}
          label='Skill1'
          handleChange={this.handleChange}
        />
        <Dropdown
          options={skills}
          label='Skill2'
          handleChange={this.handleChange}
        />
        <button disabled={this.checkDropdowns()}>Submit</button>
      </form>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Profile);
