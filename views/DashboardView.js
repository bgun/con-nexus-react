'use strict';

import React from 'react-native';

let {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

import { Actions } from 'react-native-router-flux';


export default class DashboardView extends Component {

  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <TouchableHighlight onPress={ Actions.schedule }
          ><Text>Link</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFF00',
    flex: 1,
    justifyContent: 'center'
  }
});