'use strict';

import React from 'react-native';

let {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View
} = React;


export default class ScheduleView extends Component {

  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView style={ styles.scroll }>
          <View><Text>Test 1</Text></View>
          <View><Text>Test 2</Text></View>
          <View><Text>Test 3</Text></View>
          <View><Text>Test 4</Text></View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FF0000',
    flex: 1,
    justifyContent: 'center'
  },
  scroll: {
    backgroundColor: '#FFFFFF',
    marginTop: 62
  }
});