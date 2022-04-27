import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Result from '../components/Result';
import '../style/search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      artistSearched: '',
      albuns: [],
      isDisabled: true,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleButton(e) {
    const { target } = e;
    const minLength = 2;
    this.handleChange(e);
    if (target.value.length >= minLength) this.setState({ isDisabled: false });
    else this.setState({ isDisabled: true });
  }

  handleClick = async (e) => {
    e.preventDefault();
    const { artist } = this.state;
    this.setState({ isLoading: true }, async () => {
      const albumArray = await searchAlbumsAPI(artist);
      this.setState((prevState) => ({
        artist: '',
        artistSearched: prevState.artist,
        isLoading: false,
        albuns: [...albumArray],
      }));
    });
  }

  render() {
    const loading = (<h1 className="loading">Carregando...</h1>);
    const nothing = (<h2 className="text results-div">Nenhum álbum foi encontrado</h2>);
    const { artist, artistSearched, albuns, isDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search">
        {isLoading ? loading : (
          <form className="search-form">
            <input
              type="text"
              data-testid="search-artist-input"
              name="artist"
              className="artist-input"
              placeholder="Nome do Artista"
              value={ artist }
              onChange={ this.handleButton }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              className="btn btn-primary"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        )}
        {albuns.length > 0 ? (
          <div className="text results-div">
            <h2>
              {`Resultado de álbuns de: ${artistSearched}`}
            </h2>
            <Result albuns={ albuns } />
          </div>
        ) : nothing}
        </div>
      </div>
    );
  }
}

export default Search;
