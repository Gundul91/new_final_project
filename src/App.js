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

  placesInfos = {};
  markers = [];

  /*
  * @description Fetch the places's infos from foursquare, update "this.state" and render
  * @param {string} url - The URL to fetch
  */
  getPlaces(url) {
    this.markers = []
    fetch(url)
    .then(res => res.json())
    .then(res => this.setState({ places: res.response.venues }))
    .catch(err => window.alert(err))
  }

  /*
  * @description Call click event of a marker when a list element is clicked
  * @param {object} place - The place related to the list element clicked
  */
  onListClick = (place) => {
    this.markers.forEach(marker => {
      if (marker.props.id === place.target.id)
        // Trigger click event of marker.marker
        new marker.props.google.maps.event.trigger(marker.marker, 'click')
    })
  }

  /*
  * @description Add "marker" to the array "Markers"
  * @param {object} marker - The marker to add
  */
  markerCreated = (marker) => {
    if(marker)
      this.markers.push(marker)
  }

  /*
  * @description When a marker is clicked update "this.state" to show the InfoWindow
  * @param {object} props - The props of place related to the element clicked
  * @param {object} marker - The marker clicked
  */
  onMarkerClick = (props, marker) => {
    // Remove the previous marker animation
    if (this.state.activeMarker !== null && this.state.activeMarker !== marker)
      this.state.activeMarker.setAnimation(null)
    // Add the marker animation
    marker.setAnimation(props.google.maps.Animation.BOUNCE)
    let infoPhoto = ''
    // If the place infos are yet in "this.placesInfos" use that else use the new receved and fatch the image
    if (this.placesInfos[props.id]) {
      props = this.placesInfos[props.id].props
      marker = this.placesInfos[props.id].marker
      this.state.urlPhoto = ''
      if (this.placesInfos[props.id].infoPhoto) {
        infoPhoto = this.placesInfos[props.id].infoPhoto
        this.state.urlPhoto = infoPhoto.prefix + '200x300' + infoPhoto.suffix
      }
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    } else {
      // Save the infos in "this.placesInfos"
      this.placesInfos[props.id] = {}
      this.placesInfos[props.id].props = props
      this.placesInfos[props.id].marker = marker
      this.placesInfos[props.id].infoPhoto = ""
      // Fetch the place images
      fetch('https://api.foursquare.com/v2/venues/' + props.id + '/photos?client_id=LC0GY54VBUJOVC5RURAESLSK1TK3YPNGYXGVK3BWDGGTAHEX&client_secret=JFZ3ZCNVU4RDDH1PUV3KHKS5PLLJSQ5RVPQZ4AJNLMZAB1MV&v=20170901')
      .then(res => res.json())
      .then(res => {
        this.state.urlPhoto = ''
        // If there are images use the first in the InfoWindow
        if (res.response.photos) {
          infoPhoto = res.response.photos.items[0]
          this.placesInfos[props.id].infoPhoto = infoPhoto
          this.state.urlPhoto = infoPhoto.prefix + '200x300' + infoPhoto.suffix
        }
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        })
      }).catch(err => {
        // If there are errors with the fetch use the InfoWindow without photo
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          urlPhoto: ''
        })
      })
    }
  };

  /*
  * @description When map is clicked hide the InfoWindow
  */
  onMapClicked = () => {
    if (this.state.activeMarker)
      this.state.activeMarker.setAnimation(null)
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  /*
  * @description When all is mounted get the places
  */
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
