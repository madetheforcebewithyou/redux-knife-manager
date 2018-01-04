import _ from 'lodash';
import reduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.add()', () => {
  beforeEach(() => {
    reduxKnifeManager.setup({
      namespace: Math.random(),
    });
  });

  it('should setup the namespace successfully', () => {
    reduxKnifeManager.setup({
      namespace: 'test',
    });

    reduxKnifeManager.getRootReducer().should.have.property('test');
  });

  it('should reset knives after setuping the configuration', () => {
    const config1 = generateConfig();
    const config2 = generateConfig();
    const config3 = generateConfig();

    _.forEach([config1, config2, config3], (config) => {
      reduxKnifeManager.addKnife(config.category, config.config);
    });

    // setup
    reduxKnifeManager.setup();
    reduxKnifeManager.getRootReducer().should.be.an('object');
    reduxKnifeManager.getKnives().should.to.eql({});
    (reduxKnifeManager.getKnife(Math.random()) === undefined).should.to.eql(true);
  });
});
