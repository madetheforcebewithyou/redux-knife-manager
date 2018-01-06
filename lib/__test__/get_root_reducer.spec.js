import _ from 'lodash';
import reduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.getRootReducer()', () => {
  beforeEach(() => {
    reduxKnifeManager.initialize({
      namespace: Math.random(),
    });
  });

  it('should get rootReducer with 0 knives successfully', () => {
    reduxKnifeManager.getRootReducer().should.be.an('object');
  });

  it('should get rootReducer with 3 knives successfully', () => {
    const config1 = generateConfig();
    const config2 = generateConfig();
    const config3 = generateConfig();

    _.forEach([config1, config2, config3], (config) => {
      reduxKnifeManager.addKnife(config.category, config.config);
    });

    reduxKnifeManager.getRootReducer().should.be.an('object');
  });
});
