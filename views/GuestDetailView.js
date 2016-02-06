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
    let guest = this.props.guest;
    return (
      <ScrollView style={ styles.view }>
        <H1>{ guest.name }</H1>
        <HtmlView value={ guest.bio } />
        <H4>Itinerary</H4>
        <View style={ globalStyles.floatingList }>
          { guest.event_list ? guest.event_list.map(e => (
            <EventItem key={ e.event_id } event_id={ e.event_id } />
          )) : null}
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  }
});