import React, { Component } from 'react';

class PlaceList extends Component {
  state = {
    listOpen: false
  };

  filter = ["Piazza", "Foro", "Colosseo"]

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render() {
    const{listOpen, headerTitle} = this.state
    return(
      <div className="placeBar">
        <h2>Locations</h2>
        <ul className="PlaceList">
        {this.props.places.map(item => (
          <li className="location" key={item.id} id={item.id} onClick={this.props.onListClick}>{item.name}</li>
        ))}
        </ul>
      </div>
    )
  }
}

export default PlaceList
