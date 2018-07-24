import React, { Component } from 'react';
import './App.css';
import MyMap from './MyMap.js'

class App extends Component {
  state = {
    center: { lat: 41.89297, lng: 12.5108 },
    zoom: 17,
    places: []
  }
  getPlaces() {
    fetch('https://api.foursquare.com/v2/venues/search?near=Rome&radius=150&categoryId=4d4b7105d754a06374d81259&client_id=LC0GY54VBUJOVC5RURAESLSK1TK3YPNGYXGVK3BWDGGTAHEX&client_secret=JFZ3ZCNVU4RDDH1PUV3KHKS5PLLJSQ5RVPQZ4AJNLMZAB1MV&v=20170901')
    .then(res => res.json())
    .then(res => {
      this.setState({places: res.response.venues})
    })
  }
  componentDidMount() {
    this.getPlaces()
  }
  render() {
    return (
      <div className="App">
        <MyMap
          center={this.state.center}
          zoom={this.state.zoom}
          places={this.state.places}/>
      </div>
    );
  }
}

export default App;
