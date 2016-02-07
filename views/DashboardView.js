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
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
          <Image style={{ height: 350, width: ww }} source={ require('../img/mysticon.jpg') } />
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