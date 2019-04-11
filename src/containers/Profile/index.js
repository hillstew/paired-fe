import React, { Component } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { createUser } from '../../thunks/createUser';
import { connect } from 'react-redux';
import { Availability } from '../../components/Availability';

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
      skill2: '',
      availabilities: Array(15).fill(false)
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

  handleClick = (event, i) => {
    event.preventDefault();
    const { availabilities } = this.state;
    const newAvailabilities = availabilities.map((availability, j) => {
      return i === j ? !availability : availability;
    });
    this.setState({ availabilities: newAvailabilities });
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
      skill2,
      availabilities
    } = this.state;
    let pronounsToSave = pronouns;

    if (pronouns === 'prefer not to answer') {
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
    await this.props.createUser(user, availabilities);
  };

  render() {
    const { name, slack, email, availabilities } = this.state;
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
        <h2>Please complete your profile</h2>
        <div className='Profile--div'>
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
        </div>
        <Availability
          availabilities={availabilities}
          handleClick={this.handleClick}
        />
        <button disabled={this.checkDropdowns()} className='Profile--button'>
          Submit
        </button>
      </form>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  createUser: (user, availabilities) =>
    dispatch(createUser(user, availabilities))
});

export default connect(
  null,
  mapDispatchToProps
)(Profile);
