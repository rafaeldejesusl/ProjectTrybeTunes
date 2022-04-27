import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../style/musicCard.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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
    const { isChecked } = this.state;
    if (!isChecked) {
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
      <div key={ music.trackId } className="audio-div">
        <p>{music.trackName}</p>
        <div className="rep-div">
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <img
            role="button"
            id={ music.trackId }
            data-testid={ `checkbox-music-${music.trackId}` }
            className="music-heart"
            onClick={ this.handleClick }
            src={ isChecked ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
          />
        </div>
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
