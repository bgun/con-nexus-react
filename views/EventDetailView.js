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
        <View>
          { this.props.guest_list ? this.props.guest_list.map(guest => (
            <View key={ guest.guest_id }><Text>{ guest.name }</Text></View>
          )) : null}
        </View>
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