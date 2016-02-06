'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  MapView,
  Text,
  StatusBarIOS,
  View
} from 'react-native';


export default class LocalMapView extends React.Component {

  render() {
    return (
      <View style={ styles.container }>
        <MapView />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});