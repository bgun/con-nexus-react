'use strict';

import React from 'react-native';

let {
  AsyncStorage
} = React;

let fetchOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};


export default {

  checkForUpdates: () => {
    fetch('http://con-nexus.bgun.me/api/con/jcon2015', fetchOptions)
      .then(resp => resp.json())
      .then(data => {
        console.log("fetched data");
        AsyncStorage.setItem('con_data', JSON.stringify(data), function() {
          global.con_data = data;
          console.log("set new data", global);
        });
      })
  },

  fetchFromNetwork: () => {
    fetch('http://con-nexus.bgun.me/api/con/jcon2015', fetchOptions)
      .then(resp => resp.json())
      .then(data => {
        console.log("fetched data");
        AsyncStorage.setItem('con_data', JSON.stringify(data), function() {
          global.con_data = data;
          console.log("set new data", global);
        });
      })
  },

  fetchFromStorage: () => {
    return new Promise((finalResolve, reject) => {
      AsyncStorage.getItem('con_data', (err, resp) => {
        console.log("what was in storage?", resp);
        if (err) {

        } else if (resp) {
          global.con_data = JSON.parse(resp);
            global.con_data = data;
        } else {
        }
      })
      .catch(function() {
        console.error("error fetching data");
      });
    });
  }

}