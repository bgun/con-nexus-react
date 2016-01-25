'use strict';

import React from 'react-native';

let {
  Component,
  StyleSheet,
  Text,
  View
  } = React;


export default class LocalMapView extends Component {

  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Local Map</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#00FF00',
    flex: 1,
    justifyContent: 'center'
  }
});