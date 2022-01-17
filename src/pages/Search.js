import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

const minNameArtist = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      isButtonDisabled: true,
      isAlbumFound: false,
      saveNameInput: '',
      albumsList: [],
    };

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleButtonValidation = this.handleButtonValidation.bind(this);
  }

  handleNameInput({ target }) {
    this.setState({
      nameInput: target.value,
      saveNameInput: target.value,
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
        this.setState({ nameInput: '', isAlbumFound: false });
      } else {
        this.setState({ isAlbumFound: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      nameInput,
      isButtonDisabled,
      isAlbumFound,
      albumsList,
      saveNameInput,
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

        {isAlbumFound && <p>Nenhum álbum foi encontrado</p>}
        {albumsList.length > 0 && <p>{`Resultado de álbuns de: ${saveNameInput}`}</p>}
        {
          albumsList.length > 0 && albumsList.map((album) => (
            <Link
              to={ `/album/${album.collectionId}` }
              key={ album.collectionId }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <div>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{ album.collectionName }</p>
              </div>
            </Link>))
        }
      </div>
    );
  }
}

export default Search;
