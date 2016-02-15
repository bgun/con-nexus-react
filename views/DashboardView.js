'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import _ from 'lodash';

import { Actions } from 'react-native-router-flux';


import dataStore from '../dataStore';
import EventItem from '../components/EventItem';

let window = Dimensions.get('window');


export default class DashboardView extends Component {

  constructor(props) {
    super();
    this.state = {
      con_data: global.con_data || {},
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
    this.getTodos();
  }

  componentWillReceiveProps() {
    this.getTodos();
  }

  getTodos() {
    console.log("GET TODOS");
    if (global.con_data) {
      dataStore.fetchTodos()
        .then(todos => {
          let todosArray = Array.from(todos);
          todosArray = _(todosArray).map(todo => {
            return _.find(global.con_data.events, e => e.event_id === todo);
          }).sortBy("datetime").value();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(todosArray)
          });
        }).done();
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView style={{ flexDirection: 'column' }}>
          <Image style={{ flex: 1, height: 320, width: window.width }} source={ require('../img/mysticon.jpg') } />
          <Text style={ styles.todoTitleText }>MY TO-DO LIST</Text>
          <ListView
            tabLabel="My Todo List"
            style={{ flex: 1, width: window.width }}
            dataSource={ this.state.dataSource }
            renderRow={ rowData => <EventItem key={ rowData.event_id } event_id={ rowData.event_id } /> }
          />
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#DDE',
    flex: 1,
    justifyContent: 'center'
  },
  todoTitleText: {
    color: '#778',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 6
  }
});