/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Router, Route, Schema, Animation } from 'react-native-router-flux';

import DashboardView from './views/DashboardView';
import GuestsView    from './views/GuestsView';
import LocalMapView  from './views/LocalMapView';
import ScheduleView  from './views/ScheduleView';


class ConNexusReact extends Component {

  constructor() {
    super();
    this.state = {
      con_data: {}
    }
  }

  componentWillMount() {
    console.log("test");
    fetch('http://con-nexus.bgun.me/api/con/jcon2015', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
      .then(respText => {
        console.log("resp", respText);
        this.setState({
          con_data: respText.name
        });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    return (
      <Router>
        <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight }/>

        <Route name="dashboard" component={ DashboardView } initial={ true } />
        <Route name="schedule"  component={ ScheduleView } />
        <Route name="guests"    component={ GuestsView } />
        <Route name="localMap"  component={ LocalMapView } />
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('ConNexusReact', () => ConNexusReact);
