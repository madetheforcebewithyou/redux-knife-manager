import _ from 'lodash';
import { combineReducers } from 'redux'; // eslint-disable-line import/no-unresolved
import KnifeMaker from './knife-maker';

const _config = Symbol();
const _knifeMaker = Symbol();
const _defaultConfig = Symbol();
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

  get [_defaultConfig]() {
    return {
      namespace: 'app',
      actionTypeTimestamp: true,
    };
  }

  initialize(config = {}) {
    this[_config] = _.merge({}, this[_defaultConfig], config);

    // initialize
    this[_knifeMaker] = new KnifeMaker(this[_config]);
    this[_knives] = {};
  }

  getRootReducer() {
    const reducers = {};
    _.forEach(this[_knives], (knife, category) => {
      reducers[category] = knife.reducer;
    });

    return {
      [this[_config].namespace]: combineReducers(reducers),
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
