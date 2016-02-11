'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import _      from 'lodash';
import moment from 'moment';

import { Actions } from 'react-native-router-flux';

import globalStyles from '../globalStyles';


export default class EventItem extends Component {

  constructor(props) {
    super();
    console.log("NEW EVENT ITEM", props);
  }

  render() {
    let event = _.find(global.con_data.events, e => (e.event_id === this.props.event_id));
    console.log("event", event);
    if (!event) {
      throw new Error("Event not found!");
    }
    let formatDate = moment.utc(event.datetime).format('dddd h:mma');
    return (
      <TouchableOpacity style={[globalStyles.floatingListItem, styles.item]} onPress={ () => Actions.eventDetail({ event_id: event.event_id }) }>
        <Text style={ styles.titleText }>{ event.title }</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={ styles.timeText  }>{ formatDate }</Text>
          <Text style={ styles.locationText  }>{ event.location }</Text>
        </View>
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
  },
  locationText: {
    color: '#CC7744',
    fontSize: 13,
    marginLeft: 13
  }
});