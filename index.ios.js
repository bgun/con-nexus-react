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

import DashboardView   from './views/DashboardView';
import EventDetailView from './views/EventDetailView';
import GuestDetailView from './views/GuestDetailView';
import GuestsView      from './views/GuestsView';
import LocalMapView    from './views/LocalMapView';
import ScheduleView    from './views/ScheduleView';


class ConNexusReact extends Component {

  render() {
    return (
      <Router>
        <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight }/>

        <Route name="dashboard"   component={ DashboardView   } title="Dashboard" initial={ true } />
        <Route name="schedule"    component={ ScheduleView    } title="Schedule" />
        <Route name="guests"      component={ GuestsView      } title="Guests" />
        <Route name="localMap"    component={ LocalMapView    } title="Local Map" />
        <Route name="eventDetail" component={ EventDetailView } title="Event Detail" />
        <Route name="guestDetail" component={ GuestDetailView } title="Guest Detail" />
      </Router>
    );
  }
}

AppRegistry.registerComponent('ConNexusReact', () => ConNexusReact);
