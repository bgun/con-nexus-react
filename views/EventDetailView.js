'use strict';

import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import globalStyles from '../globalStyles';

import GuestItem from '../components/GuestItem';


export default class EventDetailView extends Component {

  render() {
    let event = global.con_data.events.filter(event => (
      this.props.item.event_id === event.event_id
    ));
    if (event && event.length === 1) {
      event = event[0];
    } else {
      console.error("Event not found");
    }
    return (
      <ScrollView style={ styles.view }>
        <Text style={ globalStyles.h1 }>{ event.title }</Text>
        <View>
          { event.guest_list ? event.guest_list.map(guest => (
            <GuestItem key={ guest.guest_id } item={ guest } />
          )) : null}
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    marginTop: 63,
    padding: 20
  }
});