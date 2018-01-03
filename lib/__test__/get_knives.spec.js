import _ from 'lodash';
import ReduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.getKnives()', () => {
  it('should get a empty object', () => {
    const reduxKnifeManager = new ReduxKnifeManager();

    reduxKnifeManager.getKnives().should.to.eql({});
  });

  it('should get knives successfully', () => {
    const reduxKnifeManager = new ReduxKnifeManager();

    const config1 = generateConfig();
    const config2 = generateConfig();
    const config3 = generateConfig();


    reduxKnifeManager.add(config1.category, config1.config);
    reduxKnifeManager.add(config2.category, config2.config);
    reduxKnifeManager.add(config3.category, config3.config);

    const knives = reduxKnifeManager.getKnives();
    _.forEach([config1.category, config2.category, config3.category], (category) => {
      knives[category].should.be.an('object');
      knives[category].action.should.be.an('object');
      knives[category].actionType.should.be.an('object');
      knives[category].reducer.should.be.an('function');
      knives[category].selector.should.be.an('object');
    });
  });
});
