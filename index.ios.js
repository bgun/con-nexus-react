/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
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
      menuOpen: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('con_data', (err, resp) => {
      console.log("what was in storage?");
      if (resp) {
        global.con_data = JSON.parse(resp);
        console.log("found old data");
      } else {
        fetch('http://con-nexus.bgun.me/api/con/jcon2015', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => resp.json())
          .then(data => {
            console.log("fetched data");
            AsyncStorage.setItem('con_data', JSON.stringify(data), function() {
              global.con_data = data;
              console.log("set new data", global);
            });
          })
          .catch(err => {
            console.warn(err);
          });
      }

    })
    .catch(function() {
      console.error("error fetching data");
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
