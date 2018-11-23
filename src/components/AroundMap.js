import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, } from 'react-google-maps';
import {POS_KEY} from '../constants';
import {AroundMarker} from './AroundMarker';


class AroundMap extends React.Component {

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
        <AroundMarker position={{ lat: pos.lat, lng: pos.lon }}/>
        <AroundMarker position={{ lat: pos.lat + 0.1, lng: pos.lon + 0.1 }}/>
      </GoogleMap>
    );
  }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
