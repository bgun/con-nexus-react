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
import NewsView        from './views/NewsView';
import ScheduleView    from './views/ScheduleView';

import Menu      from './components/Menu';
import Tabbers   from './components/Tabbers'
import Toast     from './components/Toast';

import dataStore from './dataStore';

import globalStyles from './globalStyles';


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
        if (storageData.updated >= networkData.updated) {
          msg = "Found same data";
          con_data = storageData;
        } else {
          msg = "Found updated data";
          con_data = networkData;
          dataStore.saveToStorage(con_data);
        }
      } else if (storageData) {
        // network failure, use stored data
        con_data = storageData;
        msg = "No Internet connection. Using stored data";
      } else if (networkData) {
        // first time we are running the app, download from network
        con_data = networkData;
        msg = "First time using app. Downloaded data";
        dataStore.saveToStorage(con_data);
      } else {
        // first time we are running the app, and we have no connection. Bummer.
      }

      //Alert.alert(msg);
      console.log(msg);

      global.makeToast(msg);

      global.con_data = con_data;
      this.setState({
        loading: false
      });
    }).done();
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
      <View style={{ flex: 1 }}>
        <SideMenu menu={ <Menu onAction={ () => this.closeMenu() } /> } menuPosition="right" isOpen={ this.state.menuOpen }>
          <View style={ styles.mainView }>
            <Router
                sceneStyle={ styles.scene }
                navigationBarStyle={ styles.navbar }
                footer={ Tabbers }
                onPressMenuButton={ () => this.openMenu() }>
              <Schema name="modal"   sceneConfig={ Navigator.SceneConfigs.FloatFromBottom }/>
              <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight  }/>
              <Schema name="tab" type="reset" />

              <Route name="dashboard" schema="tab" title="Home"      component={ DashboardView } />
              <Route name="schedule"  schema="tab" title="Schedule"  component={ ScheduleView }  />
              <Route name="guests"    schema="tab" title="Guests"    component={ GuestsView }    />
              <Route name="hotelMap"  schema="tab" title="Hotel Map" component={ HotelMapView } />

              <Route name="eventDetail" title="Event"     component={ EventDetailView } />
              <Route name="guestDetail" title="Guest"     component={ GuestDetailView } />

              <Route name="localMap"  title="Local Map" component={ LocalMapView } />
              <Route name="feedback"  title="Feedback"  component={ FeedbackView } schema="modal"/>
              <Route name="about"     title="About"     component={ AboutView    } />
              <Route name="newsFeed"  title="News"      component={ NewsView     } />
            </Router>
          </View>
          <TouchableOpacity style={ styles.menuButton } onPress={ () => Actions.newsFeed() }>
            <Icon name="bell" size={22} color="white" />
            <View style={ styles.newsDot } />
          </TouchableOpacity>
        </SideMenu>
        { this.state.loading ? (
          <View style={[ styles.loading, isLoadingStyle ]}>
            <Text>Loading...</Text>
          </View>
        ) : null }
        <Toast />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  mainView: {
    flex: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 12
  },
  menuButton: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginTop: 18,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 50
  },
  loading: {
    backgroundColor: 'white',
    opacity: 0.5,
    position: 'absolute',
      top: -20,
      left: 0,
      right: 0
  },
  navbar: {
    backgroundColor: globalStyles.COLORS.headerBg,
    borderColor: 'black',
    borderBottomWidth: 1
  },
  scene: {
    paddingTop: 63
  },
  newsDot: {
    backgroundColor: 'red',
    borderRadius: 10,
    height: 10,
    position: 'absolute',
      top: 10,
      right: 10,
    width: 10
  }
});

AppRegistry.registerComponent('ConNexusReact', () => ConNexusReact);
