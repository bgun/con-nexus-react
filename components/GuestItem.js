'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import globalStyles from '../globalStyles';


export default class GuestItem extends Component {

  render() {
    return (
      <TouchableOpacity style={[globalStyles.floatingListItem,styles.item]} onPress={ () => Actions.guests_one({ item: this.props.item }) }>
        <Text>{ this.props.item.name }</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    height: 60,
    padding: 10
  }
});