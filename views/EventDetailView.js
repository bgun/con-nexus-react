'use strict';

import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import globalStyles from '../globalStyles';


export default class EventDetailView extends Component {

  render() {
    return (
      <ScrollView style={ styles.view }>
        <Text style={ globalStyles.h1 }>{ this.props.title }</Text>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    marginTop: 63,
    padding: 20
  }
});