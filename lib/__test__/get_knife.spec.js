import _ from 'lodash';
import reduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.getKnife()', () => {
  beforeEach(() => {
    reduxKnifeManager.initialize({
      namespace: Math.random(),
    });
  });

  it('should get the undefined with the arbitrary category', () => {
    (reduxKnifeManager.getKnife(Math.random()) === undefined).should.to.eql(true);
  });

  it('should get the knife successfully', () => {
    const config1 = generateConfig();
    const config2 = generateConfig();
    const config3 = generateConfig();

    _.forEach([config1, config2, config3], (config) => {
      reduxKnifeManager.addKnife(config.category, config.config);
    });

    _.forEach([config1.category, config2.category, config3.category], (category) => {
      reduxKnifeManager.getKnife(category).should.be.an('object');
      reduxKnifeManager.getKnife(category).action.should.be.an('object');
      reduxKnifeManager.getKnife(category).actionType.should.be.an('object');
      reduxKnifeManager.getKnife(category).reducer.should.be.an('function');
      reduxKnifeManager.getKnife(category).selector.should.be.an('object');
    });
  });
});
