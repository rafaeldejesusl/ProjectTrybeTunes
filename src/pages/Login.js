import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import '../style/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isDisabled: true,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleButton(e) {
    const { target } = e;
    const minLength = 3;
    this.handleChange(e);
    if (target.value.length >= minLength) this.setState({ isDisabled: false });
    else this.setState({ isDisabled: true });
  }

  handleSubmit = async (e) => {
    const { history } = this.props;
    e.preventDefault();
    const { user } = this.state;
    this.setState({ isLoading: true }, async () => {
      await createUser({ name: user });
      history.push('/ProjectTrybeTunes/search');
    });
  }

  render() {
    const loading = (<h1 className="loading">Carregando...</h1>);
    const { isDisabled, isLoading, user } = this.state;
    if (isLoading) return (loading);
    return (
      <div data-testid="page-login" className="login-page">
        <form className="login-form card">
          <label htmlFor="login-name-input">
            <input
              type="text"
              data-testid="login-name-input"
              id="login-name-input"
              name="user"
              className="name-input"
              placeholder="Nome"
              value={ user }
              onChange={ this.handleButton }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            className="btn btn-primary"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
