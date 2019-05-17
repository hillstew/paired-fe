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
      'skill 2': '',
      'skill 3': ''
    };
  }

  checkDropdowns = () => {
    const { program, module, email, name, slack } = this.state;
    return !program || !module || !email || !name || !slack;
  };

  componentDidMount() {
    const { match, user } = this.props;
    if (match.path === '/edit-profile') {
      const { name, email, pronouns, slack, program, module, skills } = user;
      let moduleToSave = module.toString();
      if (module === 5) moduleToSave = 'Graduate';
      this.setState({
        name,
        email,
        pronouns,
        slack,
        program,
        module: moduleToSave,
        'skill 1': skills[0] || '',
        'skill 2': skills[1] || '',
        'skill 3': skills[2] || ''
      });
    }
  }

  formatUserData = () => {
    const { image, firebaseID } = this.props;
    const { module, program, name, email, pronouns, slack } = this.state;
    let moduleToSave = module;
    if (module === 'Graduate') moduleToSave = '5';
    const user = {
      name,
      email,
      image,
      firebaseID,
      program,
      pronouns,
      slack,
      module: moduleToSave,
      skill1: this.state['skill 1'],
      skill2: this.state['skill 2'],
      skill3: this.state['skill 3']
    };
    return user;
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

  render() {
    const { name, slack, email, pronouns, module, program } = this.state;
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
          <h2 className='Profile--h2'>Please complete your profile</h2>
          <div className='Profile--div'>
            <div className='Profile--div--flex'>
              <label htmlFor='name'>
                Name<span>*</span>
              </label>
              <input
                className='Profile--input'
                value={name}
                name='name'
                onChange={this.handleChange}
              />
              <label htmlFor='Pronouns'>Pronouns</label>
              <input
                className='Profile--input'
                value={pronouns}
                label='Pronouns'
                name='pronouns'
                onChange={this.handleChange}
                placeholder='e.g. she/her, he/him, they/them, etc.'
                maxLength='10'
              />
              <label htmlFor='email'>
                Email<span>*</span>
              </label>
              <input
                className='Profile--input'
                value={email}
                name='email'
                onChange={this.handleChange}
              />
              <label htmlFor='slack'>
                Slack handle<span>*</span>
              </label>
              <input
                className='Profile--input'
                value={slack}
                name='slack'
                onChange={this.handleChange}
                placeholder='@'
              />
            </div>
            <Dropdown
              className='Profile--Dropdown'
              options={['FE', 'BE']}
              label='Program'
              handleChange={this.handleChange}
              required={true}
              selectedItem={program}
            />
            <Dropdown
              className='Profile--Dropdown'
              options={[1, 2, 3, 4, 'Graduate']}
              label='Module'
              handleChange={this.handleChange}
              required={true}
              selectedItem={module}
            />
            <h4>Provide skills you can help others with (optional)</h4>
            <Dropdown
              className='Profile--Dropdown'
              options={skills}
              label='Skill 1'
              handleChange={this.handleChange}
              selectedItem={this.state['skill 1']}
            />
            <Dropdown
              className='Profile--Dropdown'
              options={skills}
              label='Skill 2'
              handleChange={this.handleChange}
              selectedItem={this.state['skill 2']}
            />
            <div className='Profile--div--flex'>
              <label htmlFor='Skill 3'>Skill 3</label>
              <input
                className='Profile--input'
                name='Skill 3'
                value={this.state['skill 3']}
                placeholder='Additional skill - max 20 characters'
                maxLength='20'
                onChange={this.handleChange}
              />
            </div>
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

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  createUser: (user, availabilities) =>
    dispatch(createUser(user, availabilities))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

Profile.propTypes = {
  createUser: PropTypes.func,
  email: PropTypes.string,
  firebaseID: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string
};
