'use strict';

import React from 'react-native';

let {
  Component,
  Dimensions,
  InteractionManager,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

import moment from 'moment';

import EventItem from '../components/EventItem';

let window = Dimensions.get('window');

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default class ScheduleView extends Component {

  constructor(props) {
    super();

    console.log("schedule", props);

    var getSectionData = (dataBlob, sectionID) => {
      console.log("getsectiondata", sectionID);
      return dataBlob[sectionID];
    };

    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID+':'+rowID];
    };

    let dataBlob = {};
    let sectionIDs = [];
    let rowIDs     = [];
    let currentDay = null;

    global.con_data.events.forEach(e => {
      let d = moment(e.datetime);
      let day = days[d.day()];
      if (day !== currentDay) {
        console.log("new day", d.day());
        sectionIDs.push(day);
        dataBlob[day] = d;
        rowIDs.push([]);
        currentDay = day;
      }
      rowIDs[rowIDs.length-1].push(e._id);
      dataBlob[day+':'+e._id] = e;
    });
    console.log("BLOB",dataBlob);

    let ds = new ListView.DataSource({
      getRowData     : getRowData,
      getSectionData : getSectionData,
      rowHasChanged           : (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      searchResults: []
    };
  }

  handleFilterInput(text) {
    if (text.length > 2) {
      let filteredEvents = global.con_data.events.filter(e => {
        return e.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      console.log("Displaying events", filteredEvents);
      this.setState = {
        searchResults: filteredEvents,
        filterText: text
      };
      this.render();
    } else {
      this.setState = {
        searchResults: [],
        filterText: text
      };
    }
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={ styles.section }>
        <Text style={ styles.sectionText }>{ sectionData.format('dddd') }</Text>
      </View>
    );
  }

  renderRow(rowData) {
    return <EventItem key={ rowData.event_id } event_id={ rowData.event_id } />;
  }

  render() {
    console.log("results", this.state.searchResults);
    return (
      <View>
        { this.state.searchResults.length ? (
          <ScrollView style={ styles.searchResults }>
            { this.state.searchResults.map(sr => (
              <EventItem key={ sr.event_id } event_id={ sr.event_id } />
            ) ) }
          </ScrollView>
        ) : (
          <ListView
            style={ styles.scroll }
            dataSource={ this.state.dataSource }
            renderRow={ this.renderRow }
            renderSectionHeader={ this.renderSectionHeader }
          />
        ) }
        <View style={ styles.filterContainer }>
          <TextInput placeholder="Search for an event" style={ styles.filterInput } value={ this.state.filterText } onChangeText={ this.handleFilterInput.bind(this) } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
  filterInput: {
    fontSize: 15,
    height: 40
  },
  scroll: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 100,
    marginTop: 39,
    height: window.height - 40,
    position: 'absolute',
      left: 0,
    width: window.width
  },
  searchResults: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    marginTop: 39,
    height: window.height - 40,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
  section: {
    backgroundColor: 'gray',
    padding: 10
  },
  sectionText: {
    color: 'white'
  }
});