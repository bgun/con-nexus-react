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
    let guest = global.con_data.guests.filter(g => (g.guest_id === this.props.guest_id))[0];
    if (!guest) {
      throw new Error("Guest not found");
    }
    return (
      <TouchableOpacity style={[globalStyles.floatingListItem,styles.item]} onPress={ () => Actions.guestDetail({ guest: guest }) }>
        <Text>{ guest.name }</Text>
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