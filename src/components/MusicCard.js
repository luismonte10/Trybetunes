import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.handleGetFavoriteSongs();
  }

  handleGetFavoriteSongs = async () => {
    const { music } = this.props;
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((song) => {
      if (song.trackId === music.trackId) this.setState({ isChecked: true });
    });
    this.setState({ isLoading: false });
  }

  handleAddAndRemoveSong = async () => {
    const { music } = this.props;
    const { isChecked } = this.state;
    this.setState({ isLoading: true });
    if (isChecked) {
      this.setState({ isChecked: false });
      await removeSong(music);
    } else {
      this.setState({ isChecked: true });
      await addSong(music);
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { isLoading, isChecked } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ `${trackId}` }>
          <input
            type="checkbox"
            name={ `${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ isChecked }
            onChange={ this.handleAddAndRemoveSong }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
