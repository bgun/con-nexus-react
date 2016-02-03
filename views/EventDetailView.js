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

import GuestItem from '../components/GuestItem';
import { H1, H2, H3, H4 } from '../components/Headings';


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
        <H1 style={ globalStyles.h1 }>{ event.title }</H1>
        <HtmlView value={ event.description } />
        <H4>Guests</H4>
        <View style={ globalStyles.floatingList }>
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