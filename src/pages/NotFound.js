import React, { Component } from 'react';
import Header from '../components/Header';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        <h1 className="loading">NotFound</h1>
      </div>
    );
  }
}

export default NotFound;
