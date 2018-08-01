import React, { Component } from 'react';

class PlaceList extends Component {
  /*
  * @description When all is mounted add a click event listener for the "barButton" and the "placeBar"
  * usefool in "Portrait" orientation
  */
  componentDidMount() {
    let button = document.querySelector(".barButton")
    let element = document.querySelector(".placeBar")
    button.addEventListener("click", function() {
      let style = window.getComputedStyle(element)
      if (style.getPropertyValue("left") === "0px") {
        element.style.left = "calc(-58%)"
      } else {
        element.style.left = "0px"
      }
    })
    element.addEventListener("click", function() {
      let style = window.getComputedStyle(element)
      if (style.getPropertyValue("left") !== "0px") {
        element.style.left = "0px"
      }
    })
  }

  render() {
    return(
      <div className="placeBar">
        {/* When the "searchBar" content change call getPlaces with this query added */}
        <input className="searchBar" tabIndex="1" type="text" placeholder="Search" onChange={(e) => this.props.getPlaces('https://api.foursquare.com/v2/venues/search?near=Rome&radius=150&categoryId=4d4b7105d754a06374d81259&client_id=LC0GY54VBUJOVC5RURAESLSK1TK3YPNGYXGVK3BWDGGTAHEX&client_secret=JFZ3ZCNVU4RDDH1PUV3KHKS5PLLJSQ5RVPQZ4AJNLMZAB1MV&v=20170901&query=' + e.target.value)}/>
        <h1>Locations</h1>
        <ul className="placeList">
        {/* Add a "location" to the "placeList" for every place*/}
        {this.props.places.map((item, index) => (
          <li className="location"  tabIndex={2+index} key={item.id} id={item.id} onClick={this.props.onListClick}>{item.name}</li>
        ))}
        </ul>
        <button className="barButton">X</button>
      </div>
    )
  }
}

export default PlaceList
