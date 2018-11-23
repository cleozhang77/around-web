import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import {POS_KEY} from '../constants';
//import {AroundMarker} from './AroundMarker';


class AroundMap extends React.Component {
  state = {
    isOpen: false,
  }

  onToggleOpen = () => {
    this.setState((prevState) => {
      return {isOpen: !prevState.isOpen};
    });
  }

  onDragEnd = () => {
    const center = this.map.getCenter();
    const position = {lat: center.lat(), lon: center.lng()};
    localStorage.setItem(POS_KEY, JSON.stringify(position));
    this.props.loadNearbyPosts();
  }

  getMapRef = (map) => {
    this.map = map;
  }

  render() {
    const pos = JSON.parse(localStorage.getItem(POS_KEY));
    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: pos.lat, lng: pos.lon }}
      >
        <Marker
          position={{lat: -34.397, lng: 150.664}}
          onClick={this.onToggleOpen}
        >
          {this.state.isOpen ? <InfoWindow onCloseClick={this.props.onToggleOpen}>
            <div>abcdfsdf</div>
          </InfoWindow> : null }
        </Marker>
      </GoogleMap>
    );
  }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
