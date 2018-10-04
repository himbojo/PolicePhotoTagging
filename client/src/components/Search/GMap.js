import React,{ Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {

  Button

} from "react-bootstrap";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div>
      <Button className="searchButton" bsStyle="primary" onClick={() => this.props.onShowMap(0)}>
        Back
      </Button>
      <Map google={this.props.google}
          onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>Helo</h1>
            </div>
        </InfoWindow>
      </Map>
    </div>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBuVw9ta7tvl3JELuTnquo4_uOYeXj3HiM"
})(MapContainer)
