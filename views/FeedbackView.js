'use strict';

import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import HtmlView from 'react-native-htmlview';

import globalStyles from '../globalStyles';

import GuestItem from '../components/GuestItem';
import { H1, H2, H3, H4 } from '../components/Headings';


export default class FeedbackView extends Component {

  constructor() {
    super();
    this.state = {
      text: null
    }
  }

  handleInput(text) {
    this.state.text = text;
  }

  render() {
    return (
      <ScrollView style={ styles.view }>
        <H2>Feedback for { this.props.subject }</H2>
        <TextInput
          multiline={ true }
          onChangeText={ this.handleInput.bind(this) }
          style={ styles.input }
          value={ this.state.text }
        />
      </ScrollView>
    );
  }
}
FeedbackView.propTypes = {
  subject: React.PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    height: 200,
    padding: 10
  }
});