import React from 'react-native';

let {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Entypo';

let window = Dimensions.get('window');


class TabIcon extends React.Component {
  handlePress() {
    this.setState({
      selected: true
    });
    Actions[this.props.action]();
  }
  render() {
    return (
      <TouchableOpacity style={ styles.tab } onPress={ this.handlePress.bind(this) }>
        <Icon name={ this.props.icon } color="white" size={20} />
        <Text style={{ color: 'white' }}>{ this.props.text }</Text>
      </TouchableOpacity>
    );
  }
}

export default class Tabbers extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <TabIcon icon="home"     action="dashboard" text="Home" />
        <TabIcon icon="calendar" action="schedule"  text="Schedule" />
        <TabIcon icon="users"    action="guests"    text="Guests" />
        <TabIcon icon="map"      action="hotelMap"  text="Map" />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#73A',
    borderColor: '#DDDDDD',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 50
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 7
  }
});