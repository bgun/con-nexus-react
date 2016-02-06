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


export default class EventItem extends Component {

  render() {
    let event = global.con_data.events.filter(e => (e.event_id === this.props.event_id))[0];
    return (
      <TouchableOpacity style={[globalStyles.floatingListItem, styles.item]} onPress={ () => Actions.eventDetail({ event: event }) }>
        <Text>{ event.title }</Text>
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