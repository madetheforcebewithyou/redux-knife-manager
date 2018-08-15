import _ from 'lodash';
import { combineReducers } from 'redux'; // eslint-disable-line import/no-unresolved
import KnifeMaker from './knife-maker';

const _config = Symbol();
const _knifeMaker = Symbol();
const _defaultConfig = Symbol();
const _knives = Symbol();
const _reducerFactory = Symbol();
const _instance = Symbol();

class ReduxKnifeManager {
  static get instance() {
    if (_.isNil(ReduxKnifeManager[_instance])) {
      ReduxKnifeManager[_instance] = new ReduxKnifeManager();
    }

    return ReduxKnifeManager[_instance];
  }

  constructor() {
    this.initialize();
  }

  get [_defaultConfig]() {
    return {
      namespace: 'app',
    };
  }

  initialize(config = {}) {
    this[_config] = _.merge({}, this[_defaultConfig], config);

    // initialize
    this[_knifeMaker] = new KnifeMaker(this[_config]);
    this[_knives] = {};
    this[_reducerFactory] = {};
  }

  getRootReducer() {
    const allActionType = {};
    _.forEach(this[_knives], (knife, category) => {
      allActionType[category] = {};

      _.forEach(knife.actionType, (val, key) => {
        allActionType[category][key] = val;
      });
    });

    const reducers = {};
    _.forEach(this[_knives], (knife, category) => {
      reducers[category] = this[_reducerFactory][category](allActionType);
    });

    return {
      [this[_config].namespace]: combineReducers(reducers),
    };
  }

  addKnife(category, config) {
    if (_.isEmpty(category)) {
      return undefined;
    }

    const {
      reducerFactory, action, actionType, selector,
    } = this[_knifeMaker].make({ category, ...config });

    this[_knives][category] = { action, actionType, selector };
    this[_reducerFactory][category] = reducerFactory;

    return this[_knives][category];
  }

  getKnife(category) {
    return this[_knives][category];
  }

  getKnives() {
    return this[_knives];
  }
}

export default ReduxKnifeManager.instance;
