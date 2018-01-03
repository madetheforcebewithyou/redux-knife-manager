import ReduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.getRootReducer()', () => {
  it('should get rootReducer with 0 knives successfully', () => {
    const reduxKnifeManager = new ReduxKnifeManager();

    reduxKnifeManager.getRootReducer().should.be.an('object');
  });

  it('should get rootReducer with 3 knives successfully', () => {
    const reduxKnifeManager = new ReduxKnifeManager();

    const config1 = generateConfig();
    const config2 = generateConfig();
    const config3 = generateConfig();


    reduxKnifeManager.add(config1.category, config1.config);
    reduxKnifeManager.add(config2.category, config2.config);
    reduxKnifeManager.add(config3.category, config3.config);

    reduxKnifeManager.getRootReducer().should.be.an('object');
  });
});
