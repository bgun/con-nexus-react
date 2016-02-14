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

  handleAddTodo() {
    global.todos.add(this.props.event.event_id);
    dataStore.saveTodos();
    this.forceUpdate();
  }

  handleRemoveTodo() {
    global.todos.delete(this.props.event.event_id);
    dataStore.saveTodos();
    this.forceUpdate();
  }

  render() {
    return (
      <View>
        { global.todos.has(this.props.event.event_id) ? (
          <TouchableOpacity style={ styles.buttonRemove } onPress={ () => this.handleRemoveTodo() }>
            <Text style={ styles.buttonText }>Remove from todo list</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={ styles.buttonAdd } onPress={ () => this.handleAddTodo() }>
            <Text style={ styles.buttonText }>Add to my todo list</Text>
          </TouchableOpacity>
        ) }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  buttonAdd: {
    alignItems: 'center',
    backgroundColor: '#4488DD',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonRemove: {
    alignItems: 'center',
    backgroundColor: '#2244AA',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center'
  }
});