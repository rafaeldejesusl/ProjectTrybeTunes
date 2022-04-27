import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import '../style/profileEdit.css'

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isDisabled: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const user = await getUser();
    this.fetchUser(user);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.handleButton());
  }

  handleButton() {
    const { name, email, description, image } = this.state;
    const pattern = /\S+@\S+\.com$/;
    if (name.length > 0
      && email.length > 0
      && description.length > 0
      && image.length > 0
      && pattern.test(email)) this.setState({ isDisabled: false });
    else this.setState({ isDisabled: true });
  }

  handleSubmit(e) {
    const { history } = this.props;
    e.preventDefault();
    const { name, email, description, image } = this.state;
    const user = {
      name,
      email,
      description,
      image,
    };
    this.setState({ isLoading: true }, async () => {
      await updateUser(user);
      history.push('/ProjectTrybeTunes/profile');
    });
  }

  fetchUser(object) {
    this.setState({
      isLoading: false,
      name: object.name,
      email: object.email,
      description: object.description,
      image: object.image,
    });
  }

  render() {
    const loading = (<h1 className="loading">Carregando...</h1>);
    const { isLoading, isDisabled, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? loading : (
          <div className="text edit-div">
            <h2>Profile Edit</h2>
            <form className="edit-form">
              <label htmlFor="edit-input-name">
                Name:<br />
                <input
                  type="text"
                  data-testid="edit-input-name"
                  id="edit-input-name"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-email">
                Email:<br />
                <input
                  type="text"
                  data-testid="edit-input-email"
                  id="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-description">
                Description:<br />
                <textarea
                  data-testid="edit-input-description"
                  id="edit-input-description"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-image">
                Image:<br />
                <input
                  type="text"
                  data-testid="edit-input-image"
                  id="edit-input-image"
                  name="image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="submit"
                data-testid="edit-button-save"
                className="btn btn-primary"
                disabled={ isDisabled }
                onClick={ this.handleSubmit }
              >
                Editar perfil
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileEdit;
