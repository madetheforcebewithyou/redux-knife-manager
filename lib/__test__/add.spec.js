import ReduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.add()', () => {
  it('should get an error with the invalid category', () => {
    const reduxKnifeManager = new ReduxKnifeManager();
    expect(() => reduxKnifeManager.add(undefined, {})).to.throw('should specific the category.');
  });

  it('should add the knife successfully', () => {
    const reduxKnifeManager = new ReduxKnifeManager();
    const { category, config } = generateConfig();

    reduxKnifeManager.add(category, config);
  });
});
