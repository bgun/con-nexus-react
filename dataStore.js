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

  fetchFromNetwork: () => {
    return new Promise((resolve, reject) => {
      fetch('http://con-nexus.bgun.me/api/con/jcon2015', fetchOptions)
        .then(resp => resp.json())
        .then(data => {
          console.log("fetched data from network", typeof data);
          resolve(data);
        })
        .catch(err => {
          resolve(null)
        });
    });
  },

  fetchFromStorage: () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('con_data')
        .then(resp => {
          console.log("what was in storage?", typeof resp);
          resolve(JSON.parse(resp));
        })
        .catch(err => {
          resolve(null);
        });
    });
  }

}