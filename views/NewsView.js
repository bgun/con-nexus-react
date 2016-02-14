'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import HtmlView from 'react-native-htmlview';

import { H1, H2, H3, H4 } from '../components/Headings';

import globalStyles from '../globalStyles';


export default class AboutView extends Component {

  render() {
    let newsText = "News";
    return (
      <ScrollView style={ styles.view }>
        <H2>Convention News &amp; Updates</H2>
        <HtmlView style={{ fontSize: 16 }} value={ newsText } />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  }
});