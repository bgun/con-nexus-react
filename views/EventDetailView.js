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

import FeedbackButton from '../components/FeedbackButton';
import GuestItem from '../components/GuestItem';
import { H1, H2, H3, H4 } from '../components/Headings';


export default class EventDetailView extends Component {

  render() {
    let event = this.props.event;
    return (
      <ScrollView style={ styles.view }>
        <H1 style={ globalStyles.h1 }>{ event.title }</H1>
        <HtmlView value={ event.description } />
        <H4>Guests</H4>
        <View style={ globalStyles.floatingList }>
          { event.guest_list ? event.guest_list.map(g => (
            <GuestItem key={ g.guest_id } guest_id={ g.guest_id } />
          )) : null}
        </View>
        <FeedbackButton subject={ event.title } />
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