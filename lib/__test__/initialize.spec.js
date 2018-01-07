import _ from 'lodash';
import reduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.add()', () => {
  beforeEach(() => {
    reduxKnifeManager.initialize({
      namespace: Math.random(),
    });
  });

  it('should initialize the reduxKnifeManager with default configuration successfully', () => {
    reduxKnifeManager.initialize();

    // check actionType
    const knifeConfig = generateConfig();
    reduxKnifeManager.addKnife(knifeConfig.category, knifeConfig.config);

    const increaseActionType = reduxKnifeManager.getKnife(knifeConfig.category).actionType.increase;
    /APP@.+@INCREASE/.test(increaseActionType).should.to.eql(true);

    // check rootReducer
    reduxKnifeManager.getRootReducer().should.have.property('app');
  });

  it('should initialize the namespace successfully', () => {
    reduxKnifeManager.initialize({
      namespace: 'test',
    });

    reduxKnifeManager.getRootReducer().should.have.property('test');
  });

  it('should get the actionType with timestamp with actionTypeTimestamp = true', () => {
    reduxKnifeManager.initialize({
      actionTypeTimestamp: true,
    });

    const knifeConfig = generateConfig();
    reduxKnifeManager.addKnife(knifeConfig.category, knifeConfig.config);

    const increaseActionType = reduxKnifeManager.getKnife(knifeConfig.category).actionType.increase;
    /APP@.+@INCREASE@[0-9]+/.test(increaseActionType).should.to.eql(true);
  });

  it('should not get the actionType with timestamp with actionTypeTimestamp = false', () => {
    reduxKnifeManager.initialize({
      actionTypeTimestamp: false,
    });

    const knifeConfig = generateConfig();
    reduxKnifeManager.addKnife(knifeConfig.category, knifeConfig.config);

    const increaseActionType = reduxKnifeManager.getKnife(knifeConfig.category).actionType.increase;
    /APP@.+@INCREASE/.test(increaseActionType).should.to.eql(true);
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
