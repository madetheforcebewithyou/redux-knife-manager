import reduxKnifeManager from './../';
import { generateConfig } from './utils.js';

describe('test ReduxKnifeManager.addKnife()', () => {
  beforeEach(() => {
    reduxKnifeManager.setup({
      namespace: Math.random(),
    });
  });

  it('should get an error with the invalid category', () => {
    expect(() => reduxKnifeManager.addKnife(undefined, {})).to.throw('should specific the category.');
  });

  it('should add the knife successfully', () => {
    const { category, config } = generateConfig();

    reduxKnifeManager.addKnife(category, config);
  });
});
