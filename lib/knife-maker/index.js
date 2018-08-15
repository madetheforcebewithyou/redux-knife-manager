import _ from 'lodash';

const _config = Symbol();
const _makeAction = Symbol();
const _makeSelector = Symbol();
const _makeReducer = Symbol();

export default class KnifeMaker {
  constructor(config = {}) {
    this[_config] = config;
  }

  [_makeAction]({ category, actionMap }) {
    const action = {};
    const actionType = {};

    const { namespace } = this[_config];
    // make action and actionType
    _.forEach(actionMap, (name) => {
      // generate the constant value
      const constant = `NS@${namespace}@CAT@${category}@ACT@${name}@`;

      // create actionMap
      action[name] = (payload = {}) => ({
        type: constant,
        ...payload,
      });

      // create actionTypes
      actionType[name] = constant;
    });

    return { action, actionType };
  }

  [_makeReducer]({ defaultState, reducerMap }) {
    return (actionType) => {
      const handlers = _.isFunction(reducerMap) ?
        reducerMap(actionType) : {};

      return (state = defaultState, action = {}) => {
        let result = state;

        const { type } = action;
        if (_.isFunction(handlers[type])) {
          result = handlers[type](state, action);
        }

        return result;
      };
    };
  }

  [_makeSelector]({ category, defaultState }) {
    const { namespace } = this[_config];
    if (_.isEmpty(namespace) || _.isEmpty(category)) {
      return {};
    }

    // create category selector
    const selector = {};
    const categoryNamespace = _.camelCase('get');
    selector[categoryNamespace] = (state) =>
      _.at(state, `[${namespace}][${category}]`)[0];

    // create property selector
    _.forEach(defaultState, (value, key) => {
      const functionName = _.camelCase(`${categoryNamespace}_${key}`);
      selector[functionName] = (state) =>
        _.at(state, `[${namespace}][${category}][${key}]`)[0];
    });

    return selector;
  }

  make({ category, defaultState, actionMap, reducerMap }) {
    const { action, actionType } = this[_makeAction]({ category, actionMap });
    const reducerFactory = this[_makeReducer]({ defaultState, reducerMap });
    const selector = this[_makeSelector]({ category, defaultState });

    return {
      action,
      actionType,
      reducerFactory,
      selector,
    };
  }
}
