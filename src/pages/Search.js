import React, { Component } from 'react';
import Header from '../components/Header';

const minNameArtist = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      isButtonDisabled: true,
    };

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleButtonValidation = this.handleButtonValidation.bind(this);
    //    this.handleCreateUser = this.handleCreateUser.bind(this);
  }

  handleNameInput({ target }) {
    this.setState({
      nameInput: target.value,
    }, () => this.handleButtonValidation());
  }

  handleButtonValidation() {
    const { nameInput } = this.state;
    if (nameInput.length >= minNameArtist) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  render() {
    const {
      nameInput,
      isButtonDisabled,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist-input">
            <input
              type="text"
              name="artist-input"
              data-testid="search-artist-input"
              value={ nameInput }
              onChange={ this.handleNameInput }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            // onClick={  }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
