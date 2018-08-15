describe('test ReduxKnifeManager exporter', () => {
  it('default exporter should be an object', () => {
    const reduxKnifeManager = require('./../');

    reduxKnifeManager.default.should.be.an('object');
  });

  it('rest exporter should be an function', () => {
    const { initialize, addKnife, getKnife, getKnives, getRootReducer } = require('./../');

    initialize.should.be.an('function');
    addKnife.should.be.an('function');
    getKnife.should.be.an('function');
    getKnives.should.be.an('function');
    getRootReducer.should.be.an('function');
  });
});
