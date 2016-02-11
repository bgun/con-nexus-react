/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Alert,
  AppRegistry,
  AsyncStorage,
  Component,
  Dimensions,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions, Route, Router, Schema, NavBar, TabBar } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Entypo';
import SideMenu from 'react-native-side-menu';

import AboutView       from './views/AboutView';
import DashboardView   from './views/DashboardView';
import EventDetailView from './views/EventDetailView';
import FeedbackView    from './views/FeedbackView';
import GuestDetailView from './views/GuestDetailView';
import GuestsView      from './views/GuestsView';
import HotelMapView    from './views/HotelMapView';
import LocalMapView    from './views/LocalMapView';
import ScheduleView    from './views/ScheduleView';

import Menu      from './components/Menu';
import Tabbers   from './components/Tabbers'

import dataStore from './dataStore';


class ConNexusReact extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      menuOpen: false
    }
  }

  componentWillMount() {

    let con_data = {};
    let msg = "Could not get convention data";

    Promise.all([
      dataStore.fetchFromStorage(),
      dataStore.fetchFromNetwork()
    ]).then(results => {
      let storageData = results[0];
      let networkData = results[1];

      if (storageData && networkData) {
        // we have both, take whichever is newer
        con_data = (storageData.updated >= networkData.updated) ? storageData : networkData;
        msg = (storageData.updated === networkData.updated) ? "Found same data" : "Found updated data";
      } else if (storageData) {
        // network failure, use stored data
        con_data = storageData;
        msg = "No Internet connection. Using stored data";
      } else if (networkData) {
        // first time we are running the app, download from network
        con_data = networkData;
        msg = "First time using app. Downloaded data";
      } else {
        // first time we are running the app, and we have no connection. Bummer.
      }

      //Alert.alert(msg);
      console.log(msg);

      global.con_data = con_data;
      this.setState({
        loading: false
      });
    })
    .catch(err => {
      throw err;
    });
  }

  openMenu() {
    this.setState({
      menuOpen: true
    });
  }

  closeMenu() {
    this.setState({
      menuOpen: false
    });
  }

  render() {

    let isLoadingStyle = this.state.loading ? { bottom: 0 } : {};

    return (
      <SideMenu menu={ <Menu onAction={ () => this.closeMenu() } /> } menuPosition="right" isOpen={ this.state.menuOpen }>
        <View style={{ flex: 1 }}>
          <Router sceneStyle={ styles.scene } navigationBarStyle={ styles.navbar } footer={ Tabbers } onPressMenuButton={ () => this.openMenu() }>
            <Schema name="modal"   sceneConfig={ Navigator.SceneConfigs.FloatFromBottom }/>
            <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight  }/>
            <Schema name="tab" />

            <Route name="dashboard" schema="tab" title="Home"      component={ DashboardView } />
            <Route name="schedule"  schema="tab" title="Schedule"  component={ ScheduleView }  />
            <Route name="guests"    schema="tab" title="Guests"    component={ GuestsView }    />
            <Route name="hotelMap"  schema="tab" title="Hotel Map" component={ HotelMapView } />

            <Route name="eventDetail" title="Event"     component={ EventDetailView } />
            <Route name="guestDetail" title="Guest"     component={ GuestDetailView } />

            <Route name="localMap"  title="Local Map" component={ LocalMapView } />
            <Route name="feedback"  title="Feedback"  component={ FeedbackView } schema="modal"/>
            <Route name="about"     title="About"     component={ AboutView    } />
          </Router>
        </View>
        <TouchableOpacity style={ styles.menuButton } onPress={ () => this.openMenu() }>
          <Icon name="menu" size={32} color="white" />
        </TouchableOpacity>
        <View style={[ styles.loading, isLoadingStyle ]}>
          <Text>Loading...</Text>
        </View>
      </SideMenu>
    )
  }
}

let styles = StyleSheet.create({
  menuButton: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 50
  },
  loading: {
    backgroundColor: 'pink',
    position: 'absolute',
      top: -20,
      left: 0,
      right: 0
  },
  navbar: {
    backgroundColor: 'blue'
  },
  scene: {
    paddingTop: 63
  }
});

AppRegistry.registerComponent('ConNexusReact', () => ConNexusReact);
