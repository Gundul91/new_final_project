import React, { Component } from 'react';
import './App.css';
import MyMap from './MyMap.js'
import PlaceList from './PlaceList.js'

class App extends Component {
  state = {
    center: { lat: 41.89297, lng: 12.5108 },
    zoom: 17,
    places: [],
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: {},
    urlPhoto: ''
  }
  placesInfos= {};
  markers = [];
  getPlaces(url) {
    this.markers = []
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({places: res.response.venues})
    })
  }
  onListClick = (place) => {
    this.markers.forEach(marker => {
      if(marker.props.id === place.target.id)
        new marker.props.google.maps.event.trigger(marker.marker, 'click')
    })
  }
  markerCreated = (marker) => {
    if(marker)
      this.markers.push(marker)
  }
  onMarkerClick = (props, marker) => {
    if(this.state.activeMarker !== null && this.state.activeMarker !== marker)
      this.state.activeMarker.setAnimation(null)
    marker.setAnimation(props.google.maps.Animation.BOUNCE)
    let infoPhoto = ''
    if(this.placesInfos[props.id]) {
      props= this.placesInfos[props.id].props
      marker= this.placesInfos[props.id].marker
      this.state.urlPhoto = ''
      if(this.placesInfos[props.id].infoPhoto) {
        infoPhoto= this.placesInfos[props.id].infoPhoto
        this.state.urlPhoto= infoPhoto.prefix + '200x300' + infoPhoto.suffix
      }
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    } else {
      this.placesInfos[props.id]= {}
      this.placesInfos[props.id].props= props
      this.placesInfos[props.id].marker= marker
      this.placesInfos[props.id].infoPhoto = ""
      fetch('https://api.foursquare.com/v2/venues/' + props.id + '/photos?client_id=LC0GY54VBUJOVC5RURAESLSK1TK3YPNGYXGVK3BWDGGTAHEX&client_secret=JFZ3ZCNVU4RDDH1PUV3KHKS5PLLJSQ5RVPQZ4AJNLMZAB1MV&v=20170901')
      .then(res => res.json())
      .then((res) => {
        this.state.urlPhoto = ''
        if(res.response.photos.items.length){
          infoPhoto = res.response.photos.items[0]
          this.placesInfos[props.id].infoPhoto = infoPhoto
          this.state.urlPhoto= infoPhoto.prefix + '200x300' + infoPhoto.suffix
        }
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        })
      }).catch((err) => {
        console.log(err)
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          urlPhoto: ''
        })
      })
    }

  };

  onMapClicked = (props) => {
    if(this.state.activeMarker)
      this.state.activeMarker.setAnimation(null)
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  componentDidMount() {
    this.getPlaces('https://api.foursquare.com/v2/venues/search?near=Rome&radius=150&categoryId=4d4b7105d754a06374d81259&client_id=LC0GY54VBUJOVC5RURAESLSK1TK3YPNGYXGVK3BWDGGTAHEX&client_secret=JFZ3ZCNVU4RDDH1PUV3KHKS5PLLJSQ5RVPQZ4AJNLMZAB1MV&v=20170901')
  }
  render() {
    this.markers = []
    return (
      <div className="App">
        <PlaceList
          places={this.state.places}
          onListClick={this.onListClick}
          getPlaces={this.getPlaces.bind(this)}
        />
        <MyMap
          center={this.state.center}
          zoom={this.state.zoom}
          places={this.state.places}
          showingInfoWindow={this.state.showingInfoWindow}
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}
          onMarkerClick={this.onMarkerClick}
          onMapClicked={this.onMapClicked}
          markerCreated={this.markerCreated.bind(this)}
          urlPhoto={this.state.urlPhoto}
        />
      </div>
    );
  }
}

export default App;
