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
      fetch('http://con-nexus.bgun.me/api/con/mysticon2016', fetchOptions)
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
  },

  fetchTodos: () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('todo')
        .then(resp => {
          console.log("todos", resp);
          let todos = new Set(JSON.parse(resp));
          global.todos = todos;
          resolve(todos);
        })
        .catch(err => {
          resolve(null);
        });
    });
  },

  saveTodos: (todos) => {
    let todo_array = Array.from(global.todos);
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem('todo', JSON.stringify(todo_array))
        .then(resp => {
          console.log("save todos", resp);
          resolve(resp);
        })
        .catch(err => {
          resolve(null);
        });
    });
  }

}