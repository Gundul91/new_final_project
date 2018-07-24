import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MyMap extends Component {
  render() {
    const style = {
      float: 'right',
      position: 'relative',
      width: '100%',
      height: '100%'
    }
    console.log(this.props.selectedPlace)
    return (
      <div className="map">
        <Map
          google={this.props.google}
          onClick={(props) => this.props.onMapClicked(props)}
          style={style}
          initialCenter={this.props.center}
          zoom={this.props.zoom}
        >
        {this.props.places.map((location) => {
          return (<Marker
            onClick={(props, marker) => this.props.onMarkerClick(props, marker)}
            title={location.name}
            name={location.name}
            position={location.location}
          />)
        })}

        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}>
            <div>
              <h1>{this.props.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ( "AIzaSyCjGfazU6dDNEmytBQ1oEe3p71QFpHFLiA" )
})(MyMap)
