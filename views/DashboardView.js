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

  constructor(props) {
    super();
    this.state = {
      con_data: global.con_data || {}
    }
    console.log("Dashboard props",props);
  }

  render() {
    console.log(ww, wh);
    return (
      <View style={ styles.container }>
        <ScrollView>
          <Image style={{ height: 350, width: ww }} source={ require('../img/mysticon.jpg') } />
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