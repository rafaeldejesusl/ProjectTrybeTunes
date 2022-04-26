import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
    };
    this.fetchUser = this.fetchUser.bind(this);
  }

  async componentDidMount() {
    const user = await getUser();
    this.fetchUser(user);
  }

  fetchUser(object) {
    this.setState({
      isLoading: false,
      user: { ...object },
    });
  }

  render() {
    const loading = (<h1>Carregando...</h1>);
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? loading : (
          <>
            <h2>Profile</h2>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
