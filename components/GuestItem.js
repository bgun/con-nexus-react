'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';


export default class GuestItem extends Component {

  render() {
    return (
      <TouchableOpacity style={ styles.item } onPress={ () => Actions.guestDetail(this.props.item) }>
        <Text>{ this.props.item.name }</Text>
      </TouchableOpacity>
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