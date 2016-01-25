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

import GuestItem from '../components/GuestItem';


export default class GuestsView extends Component {

  constructor(props) {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.data)
    };
  }

  render() {
    return (
      <ListView
        style={ styles.scroll }
        dataSource={ this.state.dataSource }
        renderRow={(rowData) => (
          <GuestItem key={ rowData._id } item={ rowData } />
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