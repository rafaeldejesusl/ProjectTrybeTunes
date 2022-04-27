import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../style/profile.css';

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
    const loading = (<h1 className="loading">Carregando...</h1>);
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? loading : (
          <div className="text profile-div">
            <h2>Profile</h2>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <img data-testid="profile-image" className="profile-img" src={ user.image } alt={ user.name } />
            <br />
            <Link to="/ProjectTrybeTunes/profile/edit" className="btn btn-primary">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
