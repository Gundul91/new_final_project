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
    console.log(this.props.places)
    return (
      <div className="map">
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          style={style}
          initialCenter={this.props.center}
          zoom={this.props.zoom}
        >
        {this.props.places.map((location) => {
          console.log(location)
          return (<Marker
            title={location.title}
            name={location.title}
            position={location.location}
          />)
        })}
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ( "AIzaSyCjGfazU6dDNEmytBQ1oEe3p71QFpHFLiA" )
})(MyMap)
