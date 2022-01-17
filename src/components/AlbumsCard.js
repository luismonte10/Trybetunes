import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumsCard extends Component {
  render() {
    const { album } = this.props;
    return (
      <div>
        <p>
          Resultado de álbuns de:
          {' '}
          {album.artistName}
        </p>
        <Link
          to={ `/album/${album.collectionId}` }
          key={ album.collectionId }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          <div>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <p>{ album.collectionName }</p>
          </div>
        </Link>
      </div>
    );
  }
}

AlbumsCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
  }),
}.isRequired;

export default AlbumsCard;
