import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchContainer from './components/SearchContainer';
import { fetchPhotos, fetchNextPhotos, loadingToggle } from './actions/index';
import Gallery from './components/Gallery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    console.log(props);
  }


  render() {
    const {
      getPhotos, receivedUsers, app, getNextPhotos, users, loading,
    } = this.props;
    console.log(users.andrewtneel);
    let imageURLS = [];
    let photos = [];
    const { currentUser } = app;
    console.log(currentUser);

    if (currentUser && currentUser !== '' && users[currentUser]) {
      console.log('change expected');
      imageURLS = users[currentUser].photos.map(photo => photo.urls.regular);
      ({ photos } = users[currentUser]);
    }

    return (
      <div className="App">
        <div className="main-container">
          <div className="left">
            <SearchContainer
              getPhotos={getPhotos}
              receivedUsers={receivedUsers}
              loadingToggle={loadingToggle}
            />
          </div>
          <div className="right">
            <div className="child scrollable">
              <Gallery
                photos={photos}
                fetchNextPhotos={getNextPhotos}
                appState={app}
                imageURLS={imageURLS}
                loadingToggle={loadingToggle}
                loading={loading}
              />
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
    app: state.app,
    users: state.users,
    loading: state.app.loading,
  }
);
const mapDispatchToProps = dispatch => ({
  getPhotos: async (name) => {
    dispatch(fetchPhotos(name));
  },
  loadingToggle: (isLoading) => {
    dispatch(loadingToggle(isLoading));
  },
  getNextPhotos: (name) => {
    dispatch(fetchNextPhotos(name));
  },
});

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);


export default AppConnected;
