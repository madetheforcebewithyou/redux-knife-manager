import _ from 'lodash';
import { combineReducers } from 'redux'; // eslint-disable-line import/no-unresolved
import KnifeMaker from './knife-maker';

const _config = Symbol();
const _knifeMaker = Symbol();
const _namespace = Symbol();
const _knives = Symbol();
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

  initialize(config = {}) {
    this[_config] = config;

    // initialize
    this[_knifeMaker] = new KnifeMaker({ namespace: this[_namespace] });
    this[_knives] = {};
  }

  get [_namespace]() {
    const { namespace = 'app' } = this[_config];

    return namespace;
  }

  getRootReducer() {
    const reducers = {};
    _.forEach(this[_knives], (knife, category) => {
      reducers[category] = knife.reducer;
    });

    return {
      [this[_namespace]]: combineReducers(reducers),
    };
  }

  addKnife(category, config) {
    if (_.isEmpty(category)) {
      return false;
    }

    this[_knives][category] = this[_knifeMaker].make({ category, ...config });
    return true;
  }

  getKnife(category) {
    return this[_knives][category];
  }

  getKnives() {
    return this[_knives];
  }
}

export default ReduxKnifeManager.instance;
