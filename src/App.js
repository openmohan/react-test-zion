import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchContainer from './components/SearchContainer';
import { fetchPhotos } from './actions/index';
import Gallery from './components/Gallery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { getPhotos, photos, receivedUsers } = this.props;

    return (
      <div className="App">
        <div className="main-container">
          <div className="left">
            <SearchContainer getPhotos={getPhotos} receivedUsers={receivedUsers} />
          </div>
          <div className="right">
            <div className="child scrollable">
              <Gallery photos={photos} />
            </div>
          </div>
        </div>

        <footer>
          Footer
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

const mapStateToProps = state => (
  {
    photos: state.photos,
    receivedUsers: state.receivedUsers,
  }
);
const mapDispatchToProps = dispatch => ({
  getPhotos: (name) => {
    dispatch(fetchPhotos(name));
  },
});

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);


export default AppConnected;
