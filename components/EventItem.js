'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import moment from 'moment';

import { Actions } from 'react-native-router-flux';

import globalStyles from '../globalStyles';


export default class EventItem extends Component {

  render() {
    let event = global.con_data.events.filter(e => (e.event_id === this.props.event_id))[0];
    let formatDate = moment(event.datetime).format('dddd h:mma');
    return (
      <TouchableOpacity style={[globalStyles.floatingListItem, styles.item]} onPress={ () => Actions.eventDetail({ event: event }) }>
        <Text style={ styles.titleText }>{ event.title }</Text>
        <Text style={ styles.timeText  }>{ formatDate }</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  titleText: {
    fontSize: 16
  },
  timeText: {
    color: '#666666',
    fontSize: 13
  }
});