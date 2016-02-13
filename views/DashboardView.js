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

let wh = Dimensions.get('window').height;
let ww = Dimensions.get('window').width;


export default class DashboardView extends Component {

  constructor(props) {
    super();
    this.state = {
      con_data: global.con_data || {},
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
  }

  componentWillMount() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    dataStore.fetchTodos()
      .then(todos => {
        let todosArray = Array.from(todos);
        console.log(todosArray);
        this.setState({
          dataSource: ds.cloneWithRows(todosArray)
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView style={{ flexDirection: 'column' }}>
          <Image style={{ flex: 1, height: 350, width: ww }} source={ require('../img/mysticon.jpg') } />
          <ListView
            style={{ flex: 1 }}
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
    backgroundColor: '#FFFF00',
    flex: 1,
    justifyContent: 'center'
  }
});