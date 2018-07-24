import React, { Component } from 'react';
import './App.css';
import MyMap from './MyMap.js'

class App extends Component {
  state = {
    center: { lat: 41.898611, lng: 12.476873 },
    zoom: 14
  }
  render() {
    return (
      <div className="App">
        <MyMap
          center={this.state.center}
          zoom={this.state.zoom}/>
      </div>
    );
  }
}

export default App;
