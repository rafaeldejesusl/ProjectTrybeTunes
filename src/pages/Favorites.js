import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    const loading = (<h1>Carregando...</h1>);
    const { isLoading, favMusics } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? loading : (
          <>
            <h2>Favorites</h2>
            {favMusics.map((music) => (<MusicCard
              key={ music.trackId }
              music={ music }
              favMusics={ favMusics }
              reload={ this.reload }
            />))}
          </>
        )}
      </div>
    );
  }
}

export default Favorites;
