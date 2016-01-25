'use strict';

import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';


export default class DashboardView extends Component {

  constructor() {
    super();
    this.state = {
      con_data: {}
    }
  }

  componentWillMount() {
    console.log("test");
    fetch('http://con-nexus.bgun.me/api/con/jcon2015', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
      .then(data => {
        console.log("resp", data);
        this.setState({
          con_data: data
        });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    return (
      <View style={ styles.container }>
        <View>
          <TouchableOpacity onPress={ () => Actions.schedule(this.state.con_data.events) }>
            <Text>Schedule</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={ () => Actions.localMap() }>
            <Text>Local Map</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={ () => Actions.guests(this.state.con_data.guests) }>
            <Text>Guests</Text>
          </TouchableOpacity>
        </View>
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