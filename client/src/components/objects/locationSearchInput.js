import React, {Component} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { FormControl } from "react-bootstrap";

class LocationSearchInput extends Component {

  render() {
    const searchOptions = {
      componentRestrictions: {country: "NZ"}
    }
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.handleChangeLocation}
        onSelect={this.props.handleSelectLocation}
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
