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


let aboutText = `
<p>This is some <em>text</em>.</p>
<p>This is more text!</p>
`;

export default class AboutView extends Component {

  render() {
    return (
      <ScrollView style={ styles.view }>
        <H1>About This App</H1>
        <HtmlView style={{ fontSize: 16 }} value={ aboutText } />
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