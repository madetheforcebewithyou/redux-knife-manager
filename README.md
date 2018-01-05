# Redux Knife Manager

[![Build Status](https://travis-ci.org/madetheforcebewithyou/redux-knife-manager.svg?branch=master)](https://travis-ci.org/madetheforcebewithyou/redux-knife-manager)
[![npm version](https://badge.fury.io/js/redux-knife-manager.svg)](https://badge.fury.io/js/redux-knife-manager)
[![npm monthly download](https://img.shields.io/npm/dm/redux-knife-manager.svg)](https://www.npmjs.com/package/redux-knife-manager)
[![Coverage Status](https://coveralls.io/repos/github/madetheforcebewithyou/redux-knife-manager/badge.svg?branch=master)](https://coveralls.io/github/madetheforcebewithyou/redux-knife-manager?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/6fe830dc12447fa3922b/maintainability)](https://codeclimate.com/github/madetheforcebewithyou/redux-knife-manager/maintainability)

Redux Knife Manager is the library for easily managing, encapsulating and generating the redux entities such as action, reducer, selector and so on.

The Redux Knife Manager may solve following problems:
1. Use naming convention to generate the redux action, redux action type and selector automatically.

2. Keep the codebase more cleaner even if cross-container interactions are very often.

3. Prevent the collision of action type constants.

4. Reuse the selector concept in the container and redux-saga flow.

5. Focus on the reducer logic.

In short, it can reduce the codebase complexity and gain the better convention while developing.

## Installation
Please use the following command to install Redux Knife Manager, assume you use the package managment system with yarn.

```shell
yarn add redux-knife-manager redux
```

## How to use it?
### Configuration phase
```javascript
import { createStore, combineReducers } from 'redux';
import reduxKnifeManager from 'redux-knife-manager';

// 1. add a knife into the redux knife manager 
reduxKnifeManager.addKnife('counter', {
  actionMap: ['increase', 'decrease'],
  reducerMap: ({ increase, decrease }) => ({
    [increase]: (state, action) => ({
      num: state.num + action.value,
    })

    [decrease]: (state, action) => ({
      num: state.num - action.value,
    }),
  }),
  defaultState: {
    num: 0,
  },
});

// 2. configure the redux store
const store = createStore(combineReducers(reduxKnifeManager.getRootReducer()));
```

### Use knives in the redux container
```javascript
import React from 'react';
import { connect } from 'react-redux';
import reduxKnifeManager from 'redux-knife-manager';

// 1. get the counter knife
const counterKnife = reduxKnifeManager.getKnife('counter');

// 2. configure the mapStateToProps
function mapStateToProps(state) {
  return {
    num: counterKnife.selector.getCounterNum(state),
  };
}

// 3. connect to redux
@connect(mapStateToProps)
export default class App extends React.Comopnent {
  ...

  onIncrease() {
    // dispatch the increase action
    const { dispatch } = this.props;
    dispatch(counterKnife.action.increase({ value: Math.random() }));
  }
  
  onDecrease() {
    // dispatch the decrease action
    const { dispatch } = this.props;
    dispatch(counterKnife.action.decrease({ value: 1 }));
  }
  
  render() {
    const { num } = this.props;
    
    return (
      <div>
        <button onClick={this.onIncrease}>Increase</button>
        <button onClick={this.onDecrease}>Decrease</button>
        <div>{num}</div>
      </div>
    );
  }
}
```

## Detail example
The project use todoMVC as detail examples, please refers the [examples foloder](https://github.com/madetheforcebewithyou/redux-knife-manager/tree/master/examples).

## API reference
### setup
### addKnife
### getKnife
### getKnives
### getRootReducer
## License
MIT
