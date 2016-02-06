'use strict';

import React from 'react-native';

let {
  Component,
  InteractionManager,
  ListView,
  StyleSheet,
  Text,
  View
} = React;

import EventItem from '../components/EventItem';


export default class ScheduleView extends Component {

  constructor(props) {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let events = global.con_data.events;
    this.state = {
      dataSource: ds.cloneWithRows(events)
    };
  }

  render() {
    return (
      <ListView
        style={ styles.scroll }
        dataSource={ this.state.dataSource }
        renderRow={ rowData => <EventItem key={ rowData.event_id } event_id={ rowData.event_id } /> }
      />
    );
  }

}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
    flex: 1
  }
});