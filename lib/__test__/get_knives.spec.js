import _ from 'lodash';
import reduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.getKnives()', () => {
  beforeEach(() => {
    reduxKnifeManager.initialize({
      namespace: Math.random(),
    });
  });

  it('should get a empty object', () => {
    reduxKnifeManager.getKnives().should.to.eql({});
  });

  it('should get knives successfully', () => {
    const config1 = generateConfig();
    const config2 = generateConfig();
    const config3 = generateConfig();

    _.forEach([config1, config2, config3], (config) => {
      reduxKnifeManager.addKnife(config.category, config.config);
    });

    const knives = reduxKnifeManager.getKnives();
    _.forEach([config1.category, config2.category, config3.category], (category) => {
      knives[category].should.be.an('object');
      knives[category].action.should.be.an('object');
      knives[category].actionType.should.be.an('object');
      knives[category].selector.should.be.an('object');
    });
  });
});
