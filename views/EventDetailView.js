'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import _ from 'lodash';
import HtmlView from 'react-native-htmlview';

import globalStyles from '../globalStyles';

import FeedbackButton from '../components/FeedbackButton';
import GuestItem      from '../components/GuestItem';
import TodoButton     from '../components/TodoButton';
import { H1, H2, H3, H4 } from '../components/Headings';


export default class EventDetailView extends Component {

  render() {
    let event = _.find(global.con_data.events, e => e.event_id === this.props.event_id);
    if (!event) {
      Alert.alert("Event "+event.event_id+" not found!");
      return null;
    }
    console.log("EVENT",event);
    return (
      <ScrollView style={ styles.view }>
        <H1 style={ globalStyles.h1 }>{ event.title }</H1>
        <HtmlView value={ event.description } />
        <H4>Guests</H4>
        <View style={[styles.list, globalStyles.floatingList]}>
          { event.guest_list ? event.guest_list.map(g => (
            <GuestItem key={ g } guest_id={ g } />
          )) : null}
        </View>
        <TodoButton event={ event } />
        <FeedbackButton subject={ event.title } />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    paddingBottom: 100
  },
  list: {
    marginBottom: 50
  }
});