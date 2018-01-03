import _ from 'lodash';
import { combineReducers } from 'redux';
import KnifeMaker from './knife-maker';

const _config = Symbol();
const _knifeMaker = Symbol();
const _namespace = Symbol();
const _knives = Symbol();

export default class ReduxKnifeManager {
  constructor(config = {}) {
    this[_config] = config;

    this[_knifeMaker] = new KnifeMaker({ namespace: this[_namespace] });
    this[_knives] = {};
  }

  get [_namespace]() {
    const { namespace } = this[_config];

    return _.camelCase(namespace || 'app');
  }

  getKnives() {
    return this[_knives];
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

  add(category, config) {
    if (_.isNil(category)) {
      throw new Error('should specific the category.');
    }

    this[_knives][category] = this[_knifeMaker].make({ category, ...config });
  }
}
