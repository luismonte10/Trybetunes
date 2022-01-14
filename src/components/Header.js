import React, { Component } from 'react';
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
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false, user });
  }

  render() {
    const { isLoading, user } = this.state;
    const { name } = user;

    if (isLoading) return <Loading />;

    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">{ name }</div>
      </header>
    );
  }
}

export default Header;
