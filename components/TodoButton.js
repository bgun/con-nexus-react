'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import dataStore from '../dataStore';

import globalStyles from '../globalStyles';


export default class FeedbackButton extends Component {

  handlePress() {
    global.todos.add(this.props.event.event_id);
    dataStore.saveTodos(global.todos);
  }

  render() {
    return (
      <TouchableOpacity style={ styles.button } onPress={ () => this.handlePress() }>
        <Text style={ styles.buttonText }>Add to my todo list</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#4488DD',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center'
  }
});