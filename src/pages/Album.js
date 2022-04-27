import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../style/album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      favMusics: [],
      album: '',
      artist: '',
      isLoading: true,
    };
    this.renderAlbum = this.renderAlbum.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumSelected = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    this.renderAlbum(albumSelected, favoriteSongs);
  }

  renderAlbum(array, secondArray) {
    const [first, ...newArray] = array;
    const { collectionName, artistName } = first;
    this.setState({
      album: collectionName,
      artist: artistName,
    }, () => {
      this.setState({
        isLoading: false,
        musics: [...newArray],
        favMusics: [...secondArray],
      });
    });
  }

  render() {
    const loading = (<h1 className="loading">Carregando...</h1>);
    const { musics, album, artist, isLoading, favMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? loading : (
          <div className="text album-div">
            <div className="details-div">
              <h2 data-testid="artist-name">{artist}</h2>
              <h3 data-testid="album-name">
                {album}
              </h3>
              <img src={musics[0].artworkUrl100} alt={album} className="album-img"/>
            </div>
            <div className="musics-div">
              {musics.map((music) => (<MusicCard
                key={ music.trackId }
                music={ music }
                favMusics={ favMusics }
              />))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
