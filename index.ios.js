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

import Menu     from './components/Menu';
import Tabbers  from './components/Tabbers'


class ConNexusReact extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      menuOpen: false
    }
  }

  componentWillMount() {

    // if nothing is in stoage, we have to update

    // if storage date matches basic date, no need to update

    // if no network, no update

    // if basic date > storage date, update

    dataStore.checkForUpdate()
      .then(isNew => {
        if (isNew) {
          Alert.alert(
            'Convention data update',
            'Some info has changed. Update now?',
            [//{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK',     onPress: () => this.fetchData.bind(this) }]
          );
        }
      });
  }

  fetchData() {
    dataStore.fetchFromNetwork()
      .then(data => {
        global.con_data = data;
        // TODO: hide loader
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
    return (
      <View>
        { this.state.loading ? (
          <Text>Loading...</Text>
        ) : (
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
          </SideMenu>
        )};
      </View>
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
  navbar: {
    backgroundColor: 'blue'
  },
  scene: {
    paddingTop: 63
  }
});

AppRegistry.registerComponent('ConNexusReact', () => ConNexusReact);
