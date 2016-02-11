'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
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

let wh = Dimensions.get('window').height;
let ww = Dimensions.get('window').width;


export default class DashboardView extends Component {

  constructor(props) {
    super();
    this.state = {
      con_data: global.con_data || {},
      todos: []
    }
  }

  componentWillMount() {
    dataStore.fetchTodos()
      .then(todos => {
        this.setState({
          todos: todos ? todos : []
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    let todos = Array.from(this.state.todos);
    console.log("todos", todos);
    let views = todos.map(e => <EventItem key={ e } event_id={ e } />);
    console.log("dash", views);

    return (
      <View style={ styles.container }>
        <ScrollView style={{ flexDirection: 'column' }}>
          <Image style={{ flex: 1, height: 350, width: ww }} source={ require('../img/mysticon.jpg') } />
          <View style={{ flex: 1 }}>
            { views }
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFF00',
    flex: 1,
    justifyContent: 'center'
  }
});