import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropdown } from '../../components/Dropdown';
import { createUser } from '../../thunks/createUser';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      submitted: false,
      'skill 1': '',
      'skill 2': ''
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

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
  };

  formatUserData = () => {
    const { image, firebaseID } = this.props;
    const {
      module,
      program,
      name,
      email,
      pronouns,
      slack
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
      skill1: this.state['skill 1'],
      skill2: this.state['skill 2']
    };
    return user;
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
    if (!this.state.submitted) {
      return (
        <form onSubmit={this.handleSubmit} className='Profile--form'>
          <h2>Please complete your profile</h2>
          <div className='Profile--div'>
            <div className='Profile--div--flex'>
              <label htmlFor='name'>
                Provide your name<span>*</span>
              </label>
              <input value={name} name='name' onChange={this.handleChange} />
              <label htmlFor='email'>
                Provide your email<span>*</span>
              </label>
              <input value={email} name='email' onChange={this.handleChange} />
              <label htmlFor='slack'>
                Provide your slack handle<span>*</span>
              </label>
              <input
                value={slack}
                name='slack'
                onChange={this.handleChange}
                placeholder='@'
              />
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
              required={true}
            />
            <Dropdown
              options={['FE', 'BE']}
              label='Program'
              handleChange={this.handleChange}
              required={true}
            />
            <Dropdown
              options={[1, 2, 3, 4]}
              label='Module'
              handleChange={this.handleChange}
              required={true}
            />
            <h4>
              Select skills that you feel comfortable helping others with
              (optional)
            </h4>
            <Dropdown
              options={skills}
              label='Skill 1'
              handleChange={this.handleChange}
            />
            <Dropdown
              options={skills}
              label='Skill 2'
              handleChange={this.handleChange}
            />
          </div>
          <button disabled={this.checkDropdowns()} className='Profile--button'>
            Submit
          </button>
        </form>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/set-availability',
            state: { user: this.formatUserData() }
          }}
        />
      );
    }
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

Profile.propTypes = {
  createUser: PropTypes.func,
  email: PropTypes.string,
  firebaseID: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string
};
