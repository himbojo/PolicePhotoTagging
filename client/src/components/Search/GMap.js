 import React,{ Component } from 'react';
 import * as actions from "../../actions";
 import { connect } from "react-redux";
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import {
//
//   Button
//
// } from "react-bootstrap";
// import MarkerClusterer from 'node-js-marker-clusterer';
//
// export class MapContainer extends Component {
//   constructor(props, context) {
//     super(props, context);
//
//
//     this.state = {
//         showingInfoWindow: false,
//         activeMarker: {},
//         selectedPlace: {},
//       };
//       console.log(this.props.search);
//   }
//
//
//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });
//
//   onMapClicked = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       })
//     }
//   };
//
//   onReady(mapProps, map) {
//   const markerList= [];
//   const google = this.props.google;
//   this.props.search.forEach(marker => {
//
//
//     // ↓↓ create Marker myself
//     const item = new google.maps.Marker({
//       position: {lat: marker.location.x, lng: marker.location.y},
//       map: map,
//       name: marker.offence
//     });
//     // item.addListener('click', this.onMarkerClick.bind(this));
//     markerList.push(item);
//   }, this);
//
//
//   this.setState({
//     markerList: markerList
//   });
// }
//
// displey(){
//   const google = this.props.google;
//   this.onReady();
//   var map = new google.maps.Map(document.getElementById('map'), {
//          zoom: 3,
//          center: {lat: -37.7869,lng: 175.3185},
//          mapTypeId: google.maps.MapTypeId.ROADMAP
//        });
//        console.log(this.state.markerList);
//        var markerCluster = new MarkerClusterer(map, this.state.markerList);
// }
//
//   render() {
//     return (
//
//       <div id="map">
//       <Button className="searchButton" bsStyle="primary" onClick={() => this.props.onShowMap(0)}>
//         Back
//       </Button>
//       {this.displey()}
//       <Map google={this.props.google}
//         initialCenter={{lat: -37.7869,lng: 175.3185}}
//         onReady={this.onReady.bind(this)}
//           onClick={this.onMapClicked}>
//
//
//         {/* <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />
//
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}>
//             <div>
//               <h1>Helo</h1>
//             </div>
//         </InfoWindow> */}
//       </Map>
//     </div>
//     )
//   }
// }
// function mapStateToProps({ search }) {
//   return { search };
// }
//
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBuVw9ta7tvl3JELuTnquo4_uOYeXj3HiM"
// })(connect(
//  mapStateToProps,
//  actions
// )(MapContainer))

const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBuVw9ta7tvl3JELuTnquo4_uOYeXj3HiM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.name}
          position={{ lat: marker.location.x, lng: marker.location.y }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class DemoApp extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    this.setState({markers: this.props.search});

  }

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}
function mapStateToProps({ search }) {
  console.log("mapStateToProps Activated");
  return { search };
}
export default connect(mapStateToProps,actions)(DemoApp)
