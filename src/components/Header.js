import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      user: {},
    };

    this.handleGetUser = this.handleGetUser.bind(this);
  }

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    try {
      this.setState({ isLoading: true });
      const user = await getUser();
      this.setState({ isLoading: false, user });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading, user } = this.state;
    const { name } = user;

    if (isLoading) return <Loading />;

    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        <div data-testid="header-user-name">{ name }</div>
      </header>
    );
  }
}

export default Header;
