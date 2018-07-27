import React, { Component } from 'react';

class PlaceList extends Component {
  state = {
    listOpen: false
  };

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render() {
    const{listOpen, headerTitle} = this.state
    return(
      <div className="placeBar">
        <input className="searchBar" type="text" placeholder="Search" onChange={(e) => this.props.getPlaces('https://api.foursquare.com/v2/venues/search?near=Rome&radius=150&categoryId=4d4b7105d754a06374d81259&client_id=LC0GY54VBUJOVC5RURAESLSK1TK3YPNGYXGVK3BWDGGTAHEX&client_secret=JFZ3ZCNVU4RDDH1PUV3KHKS5PLLJSQ5RVPQZ4AJNLMZAB1MV&v=20170901&query=' + e.target.value)}/>
        <h1>Locations</h1>
        <ul className="placeList">
        {this.props.places.map(item => (
          <li className="location" key={item.id} id={item.id} onClick={this.props.onListClick}>{item.name}</li>
        ))}
        </ul>
      </div>
    )
  }
}

export default PlaceList
