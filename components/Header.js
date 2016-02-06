'use strict';

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


export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      stack: [],
      title: 'foo'
    }
  }

  onPressBack() {
    Actions.pop();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      stack: newProps.router._stack,
      title: newProps.router.nextRoute ? newProps.router.nextRoute.title : 'foo'
    });
  }

  shouldComponentUpdate(newProps) {
    console.log("HEADER PROPS", newProps);
    return true;
  }

  onPressMenuButton() {
    console.log("pressed menu button", this.props);
    // onPressMenuButton
    this.props.onPressMenuButton();
  }

  render() {
    return (
      <View style={ styles.container }>

        <View style={ styles.titleContainer }>
          <Text style={ styles.title }>{ this.state.title }</Text>
        </View>

        <TouchableOpacity style={ styles.menuButton } onPress={ () => this.onPressMenuButton() }>
          <Text>Menu</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 64
  },
  back: {
    height: 64,
    width: 80,
    justifyContent: 'center',
    position: 'absolute',
      left: 0,
      top: 0
  },
  backText: {
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    height: 54,
    marginTop: 10,
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  menuButton: {
    backgroundColor: 'green',
    height: 64,
    position: 'absolute',
      right: 0,
      top: 0,
    width: 50
  }
});