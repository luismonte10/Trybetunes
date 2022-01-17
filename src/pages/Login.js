import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const minNameLength = 2;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      isButtonDisabled: true,
      isLoading: false,
      shouldRedirect: false,
    };

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleButtonValidation = this.handleButtonValidation.bind(this);
  }

  handleNameInput({ target }) {
    this.setState({
      nameInput: target.value,
    }, () => this.handleButtonValidation());
  }

  handleButtonValidation() {
    const { nameInput } = this.state;
    if (nameInput.length > minNameLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleCreateUser = async (event) => {
    event.preventDefault();
    const { nameInput } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: nameInput });
    this.setState({ isLoading: false, shouldRedirect: true });
  }

  render() {
    const {
      nameInput,
      isButtonDisabled,
      isLoading,
      shouldRedirect,
    } = this.state;

    if (isLoading) {
      return (
        <Loading />
      );
    }
    if (shouldRedirect) {
      return (
        <Redirect to="/search" />
      );
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name-input">
            <input
              type="text"
              name="name-input"
              data-testid="login-name-input"
              value={ nameInput }
              onChange={ this.handleNameInput }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleCreateUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
