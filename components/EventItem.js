'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';


export default class EventItem extends Component {

  render() {
    return (
      <TouchableHighlight style={ styles.item } onPress={ () => Actions.eventDetail(this.props.item) }>
        <Text>{ this.props.item.title }</Text>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    borderColor: '#DDDDDD',
    borderTopWidth: 1,
    height: 60,
    padding: 10
  }
});