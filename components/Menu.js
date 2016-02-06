'use strict';

import React from 'react-native';

let {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
  } = React;

import { Actions } from 'react-native-router-flux';

let window = Dimensions.get('window');


export default class Menu extends React.Component {
  render() {
    return (
      <ScrollView style={ styles.container }>
        <Text>saldkfj aslkdjf lasjdfl aksjfl asjflk ajsdlfj asldfj aslfkj alsfj alsfj alksfj lasfj lasdfkj </Text>
      </ScrollView>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'darkblue',
    height: window.height,
    right: 0
  }
});
