/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  AsyncStorage,
  Component,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Route, Router } from 'react-native-router-flux';

import DashboardView   from './views/DashboardView';
import EventDetailView from './views/EventDetailView';
import FeedbackView    from './views/FeedbackView';
import GuestDetailView from './views/GuestDetailView';
import GuestsView      from './views/GuestsView';
import LocalMapView    from './views/LocalMapView';
import ScheduleView    from './views/ScheduleView';

import Icon from 'react-native-vector-icons/FontAwesome';
import SideMenu from 'react-native-side-menu';


let TabIcon = (props) => (
  <View style={{ alignItems: 'center', flexDirection: 'column' }}>
    <Icon name="rocket" size={20} />
    <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
  </View>
);

class Header extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: '#FF0000' }}>
        <Text>Header</Text>
      </View>
    )
  }
}

class Menu extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: '#00FF00' }}>
        <Text>Menu</Text>
      </View>
    )
  }
}

class ConNexusReact extends Component {

  constructor() {
    super();
    this.state = {
      con_data: {}
    }
  }

  componentWillMount() {
    console.log("test");
    let t = this;

    AsyncStorage.getItem('con_data', function(err, resp) {
      console.log("what was in storage?");
      if (resp) {
        console.log("found old data");
        global.con_data = JSON.parse(resp);
        console.log(global.con_data);
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
              console.log("set new data");
              global.con_data = data;
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

  render() {
    console.log("DATA", this.state.con_data);

    return (
      <SideMenu menu={ Menu }>
        <Router header={ Header }>
          <Route name="tabbar">
            <Router hideNavBar={ true } footer={ TabBar }
                    tabBarStyle={{borderTopColor:'#00bb00', borderTopWidth:1,backgroundColor:'white'}}>
              <Route schema="tab" icon={ TabIcon } title="Home" name="dashboard" component={ DashboardView }/>
              <Route schema="tab" icon={ TabIcon } title="Schedule" name="schedule">
                <Router>
                  <Route name="schedule_all" title="Schedule" component={ ScheduleView }/>
                  <Route name="schedule_one" title="Event" component={ EventDetailView }/>
                  <Route name="guests_one" title="Guest" component={ GuestDetailView }/>
                  <Route name="feedback" title="Feedback" component={ FeedbackView } schema="modal"/>
                </Router>
              </Route>
              <Route schema="tab" icon={ TabIcon } name="guests" title="Guests">
                <Router>
                  <Route name="guests_all" title="Guests" component={ GuestsView   }/>
                  <Route name="schedule_one" title="Event" component={ EventDetailView }/>
                  <Route name="guests_one" title="Guest" component={ GuestDetailView }/>
                  <Route name="feedback" title="Feedback" component={ FeedbackView } schema="modal"/>
                </Router>
              </Route>
            </Router>
          </Route>

          <Route name="localMap" component={ LocalMapView } title="Local Map"/>
        </Router>
      </SideMenu>
    )
  }
}

AppRegistry.registerComponent('ConNexusReact', () => ConNexusReact);
