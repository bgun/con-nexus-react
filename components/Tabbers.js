import React from 'react-native';

let {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

import { Actions } from 'react-native-router-flux';


let window = Dimensions.get('window');

export default class Tabbers extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <TouchableOpacity style={ styles.tab } onPress={ () => Actions.dashboard() }><Text>Home</Text></TouchableOpacity>
        <TouchableOpacity style={ styles.tab } onPress={ () => Actions.schedule()  }><Text>Schedule</Text></TouchableOpacity>
        <TouchableOpacity style={ styles.tab } onPress={ () => Actions.guests()    }><Text>Guests</Text></TouchableOpacity>
        <TouchableOpacity style={ styles.tab } onPress={ () => Actions.schedule()  }><Text>News</Text></TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50
  },
  tab: {
    flex: 1,
    alignItems: 'center'
  }
});