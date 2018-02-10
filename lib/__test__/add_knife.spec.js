import reduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.addKnife()', () => {
  beforeEach(() => {
    reduxKnifeManager.initialize({
      namespace: Math.random(),
    });
  });

  it('should get an error with the invalid category', () => {
    (reduxKnifeManager.addKnife(undefined, {}) === undefined).should.to.eql(true);
  });

  it('should add the knife successfully', () => {
    const { category, config } = generateConfig();

    reduxKnifeManager.addKnife(category, config).should.be.an('object');
  });
});
