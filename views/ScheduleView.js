'use strict';

import React from 'react-native';

let {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View
} = React;

import EventItem from '../components/EventItem';


export default class ScheduleView extends Component {

  constructor(props) {
    super();
    console.log("PROPS", props);
    this.state = {
      eventItems: props.data
    }
  }

  render() {
    return (
      <ScrollView style={ styles.scroll }>
        { this.state.eventItems.map(ei => (
          <EventItem key={ ei._id } item={ ei } />
        ) ) }
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 63
  }
});