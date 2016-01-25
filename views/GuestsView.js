'use strict';

import React from 'react-native';

let {
  Component,
  StyleSheet,
  Text,
  View
  } = React;


export default class GuestsView extends Component {

  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Guests</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#0000FF',
    flex: 1,
    justifyContent: 'center'
  }
});