import React from 'react';
import PropTypes from 'prop-types';
import './SearchContainer.css';

// TODO: refactor to functional component if no state exists
export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleKeyChange = this._handleKeyChange.bind(this);
    this._renderUsers = this._renderUsers.bind(this);
  }

  _handleSubmit(e) {
    const { getPhotos } = this.props;
    const { searchName } = this.state;

    getPhotos(searchName);
    e.preventDefault();
  }

  _handleKeyChange(e) {
    this.setState({ searchName: e.target.value });
  }

  _renderUsers() {
    const { receivedUsers, getPhotos } = this.props;
    const keys = Object.keys(receivedUsers);
    return keys.map(name => (
      <li onClick={() => { getPhotos(name); }} key={name} className="clickable">
        {name}
      </li>
    ));
  }

  render() {
    const { searchName } = this.state;

    return (
      <div className="left-container">
        <form className="search-container" onSubmit={this._handleSubmit}>
          <label htmlFor="search-bar" id="label1">Username</label>
          <input type="text" id="search-bar" placeholder="Feed username and click 'enter'" value={searchName} onChange={this._handleKeyChange} />
        </form>
        <ul>
          {(this._renderUsers())}
        </ul>
        <div className="list-users" />
      </div>
    );
  }
}

SearchContainer.propTypes = {
  getPhotos: PropTypes.func,
};

// Specifies the default values for props:
SearchContainer.defaultProps = {
  getPhotos() { },
};
