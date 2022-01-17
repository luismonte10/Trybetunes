import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      artistInfo: '',
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }

  handleGetMusics = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    this.setState({ musicList: musics });
    this.setState({ artistInfo: musics[0] });
  }

  render() {
    const { musicList, artistInfo } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{ artistInfo.collectionName }</h2>
        <p data-testid="artist-name">{ artistInfo.artistName }</p>
        {
          musicList.filter((music) => music.kind === 'song')
            .map((music) => <MusicCard key={ music.trackId } music={ music } />)
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
