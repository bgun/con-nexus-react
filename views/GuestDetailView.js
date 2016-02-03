'use strict';

import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  WebView
} from 'react-native';

import globalStyles from '../globalStyles';

import EventItem from '../components/EventItem';


export default class GuestDetailView extends Component {

  render() {
    let guest = global.con_data.guests.filter(guest => (
      this.props.item.guest_id === guest.guest_id
    ));
    if (guest && guest.length === 1) {
      guest = guest[0];
    } else {
      console.error("Guest not found", guest);
    }
    return (
      <ScrollView style={ styles.view }>
        <Text style={ globalStyles.h1 }>{ guest.name }</Text>
        <WebView source={ guest.bio } />
        <View style={ globalStyles.floatingList }>
          { guest.event_list ? guest.event_list.map(event => (
            <EventItem key={ event.event_id } item={ event } />
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