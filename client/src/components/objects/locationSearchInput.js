import React, {Component} from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { FormControl, FormGroup, ControlLabel, Button, HelpBlock } from "react-bootstrap";

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat_lng: '' };
  }

  handleChangeLocation = address => {
    this.setState({ address });
  };

  handleSelectLocation = address => {
    this.setState({address: address}, () => console.log(this.state.address + " " + this.state.lat_lng));
     geocodeByAddress(address)
       .then(results => getLatLng(results[0]))
       .then(latLng => this.setState({
         lat_lng: latLng.lat + " " + latLng.lng}, () => console.log(this.state.lat_lng)))
       .catch(error => console.error('Error', error));

  };

  render() {
    const searchOptions = {
      componentRestrictions: {country: "NZ"}
    }
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChangeLocation}
        onSelect={this.handleSelectLocation}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
        <FormControl
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
