import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../style/header.css'

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount = async () => {
    const registeredUser = await getUser();
    this.handleLoading(registeredUser);
  }

  handleLoading(object) {
    this.setState({
      user: object.name,
      isLoading: false,
    });
  }

  render() {
    const loading = (<h1 className="loading">Carregando...</h1>);
    const { isLoading, user } = this.state;
    if (isLoading) return (loading);
    return (
      <div data-testid="header-component">
        <div className="header-div">
          <div className="title-div">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
           <p data-testid="header-user-name" className="text header-text">{user}</p>
          </div>
        </div>
        <nav className="header-nav btn-group">
          <Link to="/ProjectTrybeTunes/search" data-testid="link-to-search" className="btn btn-header">Search</Link>
          <Link to="/ProjectTrybeTunes/favorites" data-testid="link-to-favorites" className="btn btn-header">Favorites</Link>
          <Link to="/ProjectTrybeTunes/profile" data-testid="link-to-profile" className="btn btn-header">Profile</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
