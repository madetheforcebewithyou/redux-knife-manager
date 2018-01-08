# Redux Knife Manager

[![Build Status](https://travis-ci.org/madetheforcebewithyou/redux-knife-manager.svg?branch=master)](https://travis-ci.org/madetheforcebewithyou/redux-knife-manager)
[![npm version](https://badge.fury.io/js/redux-knife-manager.svg)](https://badge.fury.io/js/redux-knife-manager)
[![npm monthly download](https://img.shields.io/npm/dm/redux-knife-manager.svg)](https://www.npmjs.com/package/redux-knife-manager)
[![Coverage Status](https://coveralls.io/repos/github/madetheforcebewithyou/redux-knife-manager/badge.svg?branch=master)](https://coveralls.io/github/madetheforcebewithyou/redux-knife-manager?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/6fe830dc12447fa3922b/maintainability)](https://codeclimate.com/github/madetheforcebewithyou/redux-knife-manager/maintainability)

Redux Knife Manager is the lightweight library for easily managing, encapsulating and generating the redux entities such as action, reducer, selector and so on.

Redux Knife Manager has following features:
* Use naming convention to generate the redux action, redux action type and selector automatically.
* Keep the codebase more cleaner even if cross-container interactions are very often.
* Prevent the collision of action type constants.
* Reuse the selector concept in redux containers and redux saga flows.
* Support universal application.
* You can focus on redux reducer implementation and testing.

In short, it can be used to reduce the codebase complexity and gain the better convention while developing.

## Installation
Please use the following command to install Redux Knife Manager, assume you use the package management system with yarn

```shell
yarn add redux-knife-manager redux
```

or npm.

```shell
npm install --save redux-knife-manager redux
```

## How to use it?
### Configuration phase
```javascript
import { createStore, combineReducers } from 'redux';
import reduxKnifeManager from 'redux-knife-manager';

// 1. Initialize Redux Knife Manager
reduxKnifeManager.initialize();

// 2. Add a knife to Redux Knife Manager
reduxKnifeManager.addKnife('counter', {
  actionMap: ['increase', 'decrease'],
  reducerMap: ({ increase, decrease }) => ({
    [increase]: (state, action) => ({
      num: state.num + action.value,
    }),

    [decrease]: (state, action) => ({
      num: state.num - action.value,
    }),
  }),
  defaultState: {
    num: 0,
  },
});

// 3. Configure the redux store
const store = createStore(combineReducers(reduxKnifeManager.getRootReducer()));
```

### Use knives in the redux container
```javascript
import React from 'react';
import { connect } from 'react-redux';
import reduxKnifeManager from 'redux-knife-manager';

// 1. Get the counter knife
const counterKnife = reduxKnifeManager.getKnife('counter');

// 2. Configure the mapStateToProps
function mapStateToProps(state) {
  return {
    num: counterKnife.selector.getNum(state),
  };
}

// 3. Connect to redux
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

### It can also be used in the redux saga flow
```javascript
import { takeEvery } from 'redux-saga/effects';
import reduxKnifeManager from 'redux-knife-manager';

const counterKnife = reduxKnifeManager.getKnife('counter');

export default function* counterSaga() {
  yield takeEvery(counterKnife.actionType.increase, function* handleIncrese() {
    ...
  });
}
```

## Detailed examples
The project takes todoMVC as detailed examples, please refers the [examples folder](https://github.com/madetheforcebewithyou/redux-knife-manager/tree/master/examples).

## API reference
### `initialize(options)`
The function `initialize` is used to initialize Redux Knife Manager. Since Redux Knife Manager is the single instance, the knives and related entries will be **released** when `initialize` has been called.

#### Arguments
* **options (Object):**
  * **namespace (String, default: 'app'):**  
    The namespace is the prefix of top level of redux store to restore the state of knives.

#### Example
```javascript
reduxKnifeManager.initialize({
  namespace: 'example',
});
```

### `addKnife(category, config)`
The function `addKnife` is used to add a knife to Redux Knife Manager. It will generate the redux entities such as action, reducer, selector automatically by the given `config`.

#### Arguments
* **category (String):**  
  It is the the identifier to associate with the knife.
* **config (Object):**  
  * **actionMap (Array of String):**  
    Redux Knife Manager will generate collections of action generator and action type which are based on `actionMap`.
  * **reducerMap (Function):**  
    Redux Knife Manager will pass generated actions to `reducerMap`. And it **must** return the object of definition of reducers which are associated with spicfied actions.
  * **defaultState (Object):**  
    The default state of knife which is associated with `category`. In addition, the collection of selector will also be generated.

#### Returns
* Return **true** if the knife is configured successfully.
* Otherwise, **false**.

#### Example
```javascript
// 1. Initialize Reudx Knife Manager
reduxKnifeManager.initialize({
  namespace: 'example',
});


// 2. Add a knife to Reudx Knife Manager
reduxKnifeManager.addKnife('counter', {
  actionMap: ['increase', 'decrease'],
  reducerMap: ({ increase, decrease }) => ({
    [increase]: (state, action) => ({
      num: state.num + action.value,
    }),

    [decrease]: (state, action) => ({
      num: state.num - action.value,
    }),
  }),
  defaultState: {
    num: 0,
  },
});

// 3. Configure the redux store
const store = createStore(combineReducers(reduxKnifeManager.getRootReducer()));

/* 4. The redux store will be as follow:
 * {
 *   example: {
 *     counter: {
 *       num: 0
 *     }
 *  }
 */
```


### `getKnife(category)`
The function `addKnife` is used to retrieve a knife from Redux Knife Manager.

#### Arguments
* **category (String):**  
  It is the the identifier to retrieve the knife.

#### Returns
* Return the **Knife Object** which is associated with the given `category`.
* Otherwise, it will return **undefined** if the knife is not exist.
* **Knife Object:**
  * **selector (Object):**  
    The collection of selector, and the properties of selector are based on `defaultState`. It will generate the `get` method to retrieve the whole state, and selectors to retrieve the property of `defaultState`.
  * **actionType (Object):**  
    The collection of action type, and the properties of actionType are based on `actionMap`.
  * **action (Object):**  
    The collection of action generator, and the properties of action are based on `actionMap`. In order to simplify the interface, the action generator **do only accept** the payload with the plain object, and it will construct the simple action generator. The definition of action generator is as follow:
```javascript
      action[name] = (payload = {}) => ({
        type: autoGeneratedConstant,
        ...payload,
      });
```

#### Example
```javascript
// 1. Initialize Redux Knife Manager
reduxKnifeManager.initialize({
  namespace: 'example',
});

// 2. Add a knife to Redux Knife Manager
reduxKnifeManager.addKnife('counter', {
  actionMap: ['increase', 'decrease'],
  reducerMap: ({ increase, decrease }) => ({
    [increase]: (state, action) => ({
      num: state.num + action.value,
    }),

    [decrease]: (state, action) => ({
      num: state.num - action.value,
    }),
  }),
  defaultState: {
    num: 0,
  },
});

// 3. Configure the redux store
const store = createStore(combineReducers(reduxKnifeManager.getRootReducer()));

const counterKnife = reduxKnifeManager.getKnife('counter');
// 4. The collection of action type
// You can get the action type of increase via the following statement
console.log(counterKnife.actionType.increase);

// You can get the action type of decrease via the following statement
console.log(counterKnife.actionType.decrease);


// 5. The collection of action
// You can get the increase action via the following statement
console.log(counterKnife.action.increase({ value: 1 }));

// You can get the decrease action via the following statement
console.log(counterKnife.action.decrease({ value: 1 }));


// 6. The collection of selector
// You can get the whould state of counterKnife via the following statement
// and the value should be { num: 0 }
console.log(counterKnife.selector.get(store.getState()));

// You can get the num value of counterKnife via the following statement
// and the value should be 0
console.log(counterKnife.selector.getNum(store.getState()));


// 7. Reducer should also work well
store.dispatch(counterKnife.action.increase({ value: 10 }));

// You can get the num value of counterKnife via the following statement
// and the value should be 10
console.log(counterKnife.selector.getNum(store.getState()));
```


### `getKnives()`
The function `getKnives` will return all knives in Redux Knife Manager.

#### Returns
* Return the **Object** which is consist of knives which are associated their `category`.

#### Example
```javascript
// 1. Initialize Redux Knife Manager
reduxKnifeManager.initialize();

// 2. Add knives to Redux Knife Manager
reduxKnifeManager.addKnife('k1', { ... });
reduxKnifeManager.addKnife('k2', { ... });
reduxKnifeManager.addKnife('k3', { ... });

const knives = reduxKnifeManager.getKnives();

/*
 * The value of knives is as follow:
 * {
 *    k1: { ... },
 *    k2: { ... },
 *    k3: { ... }
 *  }
 */
```


### `getRootReducer()`
The function `getRootReducer` is used to get combined reducers of knives. It should be used to configure with redux store.

#### Returns
* Return the **Object** of combined reducer of knives which are associated with `namespace`.

#### Example
```javascript
// 1. Initialize Redux Knife Manager
reduxKnifeManager.initialize();

// 2. Add knives to Redux Knife Manager
reduxKnifeManager.addKnife('k1', { ... });
reduxKnifeManager.addKnife('k2', { ... });
reduxKnifeManager.addKnife('k3', { ... });

// 3. Configure the redux store
const store = createStore(combineReducers(reduxKnifeManager.getRootReducer()));
```

## Todo
* Adding the example for integrating with redux-saga
* Adding the example for integrating with re-select

## Inspired by
* [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)
* [reduck](https://github.com/enkidevs/reduck)
* [dva](https://github.com/dvajs/dva)
* [redux-actions](https://github.com/reduxactions/redux-actions)
* [redux-act](https://github.com/pauldijou/redux-act)
* [redux-auto](https://github.com/codemeasandwich/redux-auto)

## License
This project is licensed under the MIT license, Copyright (c) 2018 madetheforcebewithyou. For more information, please see `LICENSE`.
