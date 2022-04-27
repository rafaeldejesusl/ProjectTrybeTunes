import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/result.css';

class Result extends Component {
  render() {
    const { albuns } = this.props;
    return (
      <div className="results">
        {albuns.map((album) => (
          <div key={ album.collectionId } className="card result-card">
            <img src={album.artworkUrl100} alt={album.collectionName} className="card-img-top result-img" />
            <div className="card-body result-body">
            <p>{album.collectionName}</p>
            <Link
              to={ `/ProjectTrybeTunes/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
              className="result-link"
            >
              Mais Informações
            </Link>
            </div>
          </div>))}
      </div>
    );
  }
}

Result.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Result;
