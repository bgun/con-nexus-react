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

import Icon from 'react-native-vector-icons/FontAwesome';
import SideMenu from 'react-native-side-menu';


import DashboardView   from './views/DashboardView';
import EventDetailView from './views/EventDetailView';
import FeedbackView    from './views/FeedbackView';
import GuestDetailView from './views/GuestDetailView';
import GuestsView      from './views/GuestsView';
import LocalMapView    from './views/LocalMapView';
import ScheduleView    from './views/ScheduleView';

import Header   from './components/Header'
import Menu     from './components/Menu';
import Tabbers  from './components/Tabbers'



let TabIcon = (props) => (
  <View style={{ alignItems: 'center', flexDirection: 'column' }}>
    <Icon name="rocket" size={20} />
    <Text style={{color: props.selected ? 'red' :'black'}}>{ props.title }</Text>
  </View>
);


class ConNexusReact extends Component {

  constructor() {
    super();
    this.state = {
      menuOpen: false,
      title: 'none'
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
    console.log("Toggle menu", this.state.menuOpen);
    this.setState({
      menuOpen: true
    });
  }

  render() {
    return (
      <SideMenu menu={ <Menu /> } menuPosition="right" isOpen={ this.state.menuOpen }>
        <View style={{ flex: 1 }}>
          <Router header={ Header } headerTitle={ this.state.title } footer={ Tabbers } onPressMenuButton={ () => this.openMenu() }>
            <Schema name="modal"   sceneConfig={ Navigator.SceneConfigs.FloatFromBottom }/>
            <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight  }/>
            <Schema name="tab" />

            <Route name="dashboard" hideNavBar={true} schema="tab" title="Home"     component={ DashboardView } />
            <Route name="schedule"  hideNavBar={true} schema="tab" title="Schedule" component={ ScheduleView }  />
            <Route name="guests"    hideNavBar={true} schema="tab" title="Guests"   component={ GuestsView }    />

            <Route name="eventDetail"  hideNavBar={true} title="Event"     component={ EventDetailView } />
            <Route name="guestDetail"  hideNavBar={true} title="Guest"     component={ GuestDetailView } />

            <Route name="feedback"     hideNavBar={true} title="Feedback"  component={ FeedbackView } schema="modal"/>
            <Route name="localMap"     hideNavBar={true} title="Local Map" component={ LocalMapView } />
          </Router>
        </View>
      </SideMenu>
    )
  }
}

AppRegistry.registerComponent('ConNexusReact', () => ConNexusReact);
