import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
    const loading = (<h1>Carregando...</h1>);
    const { isLoading, user } = this.state;
    if (isLoading) return (loading);
    return (
      <div data-testid="header-component">
        <p data-testid="header-user-name">{user}</p>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
