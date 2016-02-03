'use strict';

import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import HtmlView from 'react-native-htmlview';

import globalStyles from '../globalStyles';

import EventItem from '../components/EventItem';
import { H1, H2, H3, H4 } from '../components/Headings';


export default class GuestDetailView extends Component {

  render() {
    console.log(H1);
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
        <H1>{ guest.name }</H1>
        <HtmlView value={ guest.bio } />
        <H4>Itinerary</H4>
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