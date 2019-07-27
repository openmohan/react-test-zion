import React from 'react';
import PropTypes from 'prop-types';

// TODO: refactor to functional component if no state exists
export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleKeyChange = this._handleKeyChange.bind(this);
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

  render() {
    const { searchName } = this.state;

    return (
      <div className="left-container">
        <form className="search-container" onSubmit={this._handleSubmit}>
          <input type="text" id="search-bar" placeholder="Enter search string" value={searchName} onChange={this._handleKeyChange} />
        </form>
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
