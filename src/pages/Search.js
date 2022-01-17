import React, { Component } from 'react';
import AlbumsCard from '../components/AlbumsCard';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

const minNameArtist = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      isButtonDisabled: true,
      teste: false,
      albumsList: [],
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
    if (nameInput.length >= minNameArtist) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleSearchAlbumsAPIs = async (event) => {
    try {
      event.preventDefault();
      const { nameInput } = this.state;
      const APIResponse = await searchAlbumsAPIs(nameInput);
      if (APIResponse.length > 0) {
        this.setState({ albumsList: APIResponse });
        this.setState({ nameInput: '', teste: false });
      } else {
        this.setState({ teste: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      nameInput,
      isButtonDisabled,
      teste,
      albumsList,
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
            onClick={ this.handleSearchAlbumsAPIs }
          >
            Pesquisar
          </button>
        </form>

        {teste && <p>Nenhum álbum foi encontrado</p>}
        {
          teste === false ? albumsList.map((album) => (<AlbumsCard
            key={ album.collectionId }
            album={ album }
          />)) : null
        }
      </div>
    );
  }
}

export default Search;
