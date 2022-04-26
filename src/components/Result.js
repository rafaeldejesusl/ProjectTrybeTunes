import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Result extends Component {
  render() {
    const { albuns } = this.props;
    return (
      <div>
        {albuns.map((album) => (
          <div key={ album.collectionId }>
            <p>{album.collectionName}</p>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              Mais Informações
            </Link>
          </div>))}
      </div>
    );
  }
}

Result.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Result;
