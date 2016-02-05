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

import { Router, Route, Schema, Animation, TabBar } from 'react-native-router-flux';

import DashboardView   from './views/DashboardView';
import EventDetailView from './views/EventDetailView';
import FeedbackView    from './views/FeedbackView';
import GuestDetailView from './views/GuestDetailView';
import GuestsView      from './views/GuestsView';
import LocalMapView    from './views/LocalMapView';
import ScheduleView    from './views/ScheduleView';

class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
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
      <Router hideNavBar={ true }>
        <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight }/>
        <Schema name="tab" type="switch" icon={TabIcon} />
        <Schema name="modal" type="replace" sceneConfig={ Navigator.SceneConfigs.FloatFromBottom } />

        <Route name="tabbar">
          <Router hideNavBar={ true } footer={ TabBar } tabBarStyle={{borderTopColor:'#00bb00',height: 100,borderTopWidth:1,backgroundColor:'white'}}>
            <Route schema="tab" title="Home"     name="dashboard"    component={ DashboardView } />
            <Route schema="tab" name="schedule" title="Schedule">
              <Router>
                <Route name="schedule_all" title="Schedule" component={ ScheduleView } />
                <Route name="schedule_one" title="Event"    component={ EventDetailView } />
                <Route name="guests_one"   title="Guest"    component={ GuestDetailView } />
              </Router>
            </Route>
            <Route schema="tab" name="guests" title="Guests">
              <Router>
                <Route name="guests_all"   title="Guests" component={ GuestsView   } />
                <Route name="schedule_one" title="Event"  component={ EventDetailView } />
                <Route name="guests_one"   title="Guest"  component={ GuestDetailView } />
              </Router>
            </Route>
          </Router>
        </Route>

        <Route schema="modal" name="feedback" component={ FeedbackView } title="Feedback" />
        <Route name="localMap" component={ LocalMapView } title="Local Map" />
      </Router>
    );
  }
}

AppRegistry.registerComponent('ConNexusReact', () => ConNexusReact);
