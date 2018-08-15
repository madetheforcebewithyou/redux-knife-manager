describe('test ReduxKnifeManager exporter', () => {
  it('default exporter should be an object', () => {
    const reduxKnifeManager = require('./../');

    reduxKnifeManager.default.should.be.an('object');
  });
});
