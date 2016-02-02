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
    this.state = {
      dataSource: ds.cloneWithRows(global.con_data.events),
    };
  }

  render() {
    return (
      <ListView
        style={ styles.scroll }
        dataSource={ this.state.dataSource }
        renderRow={(rowData) => (
          <EventItem key={ rowData._id } item={ rowData } />
        )}
      />
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