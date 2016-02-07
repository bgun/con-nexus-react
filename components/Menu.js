'use strict';

import React from 'react-native';

let {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Entypo';

let window = Dimensions.get('window');


class MenuItem extends React.Component {

  onPress() {
    Actions[this.props.action]();
    this.props.onAction();
  }

  render() {
    return (
      <TouchableOpacity style={ styles.menuItem } onPress={ () => this.onPress() }>
        <Icon name={ this.props.icon } size={16} color="white"/>
        <Text style={ styles.menuItemText }>{ this.props.text }</Text>
      </TouchableOpacity>
    )
  }
}

export default class Menu extends React.Component {
  render() {
    return (
      <ScrollView style={ styles.container }>
        <MenuItem key="0" action="schedule" text="Schedule" icon="calendar" onAction={ () => this.props.onAction() } />
        <MenuItem key="1" action="guests"   text="Guests"   icon="users"    onAction={ () => this.props.onAction() } />
        <MenuItem key="2" action="feedback" text="Feedback" icon="pencil"   onAction={ () => this.props.onAction() } />
      </ScrollView>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'darkblue',
    flex: 1,
    height: window.height,
    paddingLeft: window.width/3, // side menu defaults to 2/3 of screen width
    paddingTop: 40
  },
  menuItem: {
    borderBottomColor: '#00000033',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
    width: window.width,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 16,
  }
});
