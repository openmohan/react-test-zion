import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchContainer from './components/searchContainer';
import { fetchPhotos } from './actions/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getPhotos } = this.props;
    getPhotos('name');
  }


  render() {
    return (
      <div className="App">
        <div className="main-container">
          <div className="left">
            <SearchContainer />
          </div>
          <div className="right">
            <div className="child scrollable">
              RIGHTs
              <br />
              <br />
              <br />
              Lorem ipsum dolor  kasamet.
            </div>
          </div>
        </div>

        <footer>
          <p>Footer</p>
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  getPhotos: PropTypes.func,
};

// Specifies the default values for props:
App.defaultProps = {
  getPhotos() { },
};

const mapStateToProps = state => ({ active: state.channel });
const mapDispatchToProps = dispatch => ({
  getPhotos: (name) => {
    dispatch(fetchPhotos(name));
  },
});

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);


export default AppConnected;
