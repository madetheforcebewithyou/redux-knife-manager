import _ from 'lodash';
import reduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.initialize()', () => {
  it('should initialize the reduxKnifeManager with default configuration successfully', () => {
    reduxKnifeManager.initialize();

    // check rootReducer
    reduxKnifeManager.getRootReducer().should.have.property('app');
  });

  it('should initialize the namespace successfully', () => {
    reduxKnifeManager.initialize({
      namespace: 'test',
    });

    reduxKnifeManager.getRootReducer().should.have.property('test');
  });

  it('should reset knives after initializeing the configuration', () => {
    const config1 = generateConfig();
    const config2 = generateConfig();
    const config3 = generateConfig();

    _.forEach([config1, config2, config3], (config) => {
      reduxKnifeManager.addKnife(config.category, config.config);
    });

    // initialize
    reduxKnifeManager.initialize();
    reduxKnifeManager.getRootReducer().should.be.an('object');
    reduxKnifeManager.getKnives().should.to.eql({});
    (reduxKnifeManager.getKnife(Math.random()) === undefined).should.to.eql(true);
  });
});
