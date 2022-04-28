import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../style/favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favMusics: [],
    };
    this.renderFavorites = this.renderFavorites.bind(this);
    this.reload = this.reload.bind(this);
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.renderFavorites(favoriteSongs);
  }

  async reload() {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.renderFavorites(favoriteSongs);
  }

  renderFavorites(array) {
    this.setState({
      isLoading: false,
      favMusics: [...array],
    });
  }

  render() {
    const loading = (<h1 className="loading">Carregando...</h1>);
    const { isLoading, favMusics } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? loading : (
          <div className="text favorites-div">
            <h2 className="favorite-title">Favorites</h2>
            <div className="favorite-rep">
            {favMusics.map((music) => (<MusicCard
              key={ music.trackId }
              music={ music }
              favMusics={ favMusics }
              reload={ this.reload }
            />))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
