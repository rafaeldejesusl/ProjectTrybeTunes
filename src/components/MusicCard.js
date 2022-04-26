import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.favCheck = this.favCheck.bind(this);
  }

  componentDidMount() {
    this.favCheck();
  }

  async handleClick({ target }) {
    const { music, reload } = this.props;
    if (target.checked) {
      this.setState({
        isLoading: true,
        isChecked: true,
      });
      await addSong(music);
      this.setState({ isLoading: false });
    } else {
      this.setState({
        isLoading: true,
        isChecked: false,
      });
      await removeSong(music);
      this.setState({ isLoading: false }, () => {
        if (reload) reload();
      });
    }
  }

  favCheck() {
    const { music, favMusics } = this.props;
    const check = favMusics.some((current) => current.trackId === music.trackId);
    if (check) this.setState({ isChecked: true });
  }

  render() {
    const loading = (<p>Carregando...</p>);
    const { music } = this.props;
    const { isLoading, isChecked } = this.state;
    if (isLoading) return (loading);
    return (
      <div key={ music.trackId }>
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ music.trackId }>
          <input
            type="checkbox"
            id={ music.trackId }
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ this.handleClick }
            checked={ isChecked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.any).isRequired,
  favMusics: PropTypes.arrayOf(PropTypes.any).isRequired,
  reload: PropTypes.func,
};

MusicCard.defaultProps = {
  reload: undefined,
};

export default MusicCard;
