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

  componentDidMount() {
    const { getPhotos } = this.props;
    getPhotos('name');
  }


  render() {
    const { getPhotos } = this.props;

    return (
      <div className="App">
        <div className="main-container">
          <div className="left">
            <SearchContainer getPhotos={getPhotos} />
          </div>
          <div className="right">
            <div className="child scrollable">
              <Gallery />
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
