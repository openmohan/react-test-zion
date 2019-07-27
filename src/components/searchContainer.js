import React from 'react';

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
    e.preventDefault();
    if (e.key === 'Enter') {
      console.log('enter');
    }
    console.log(this.state);
    return false;
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
