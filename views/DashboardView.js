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

import { Actions } from 'react-native-router-flux';

let wh = Dimensions.get('window').height;
let ww = Dimensions.get('window').width;


export default class DashboardView extends Component {

  constructor() {
    super();
    this.state = {
      con_data: {}
    }
  }

  componentWillMount() {
    console.log("test");
    let t = this;

    AsyncStorage.getItem('con_data', function(err, resp) {
      console.log("what was in storage?", resp);
      if (resp) {
        console.log("found old data");
        t.setState({
          con_data: JSON.parse(resp)
        });
      } else {
        fetch('http://con-nexus.bgun.me/api/con/jcon2015', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => resp.json())
          .then(data => {
            console.log("fetched data", data);
            AsyncStorage.setItem('con_data', JSON.stringify(data), function() {
              console.log("set new data");
              t.setState({
                con_data: data
              });
            });
          })
          .catch(err => {
            console.warn(err);
          });
      }

    })
    .catch(function() {
        console.error("error fetching data");
    });

  }

  render() {
    console.log(ww, wh);
    return (
      <View style={ styles.container }>
        <ScrollView>
          <Image style={{ height: 400, width: ww }} source={ require('../img/cover.jpg') } />
          <View style={{ flex: 1, flexDirection: 'row', width: ww }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={ () => Actions.schedule(this.state.con_data.events) }>
                <Text>Schedule</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={ () => Actions.localMap() }>
                <Text>Local Map</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={ () => Actions.guests(this.state.con_data.guests) }>
                <Text>Guests</Text>
              </TouchableOpacity>
            </View>
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