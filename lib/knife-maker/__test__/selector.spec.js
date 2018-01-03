import _ from 'lodash';
import KnifeMaker from './../';

describe('test KnifeMaker selector', () => {
  const namespace = 'my-test-knife-maker';
  const knifeMaker = new KnifeMaker({ namespace });

  it('should get the empty action with empty category', () => {
    const { selector } = knifeMaker.make({});

    selector.should.to.eql({});
  });

  it('should only get the namesapce selector without defaultState', () => {
    const { selector } = knifeMaker.make({
      category: 'hahaha',
    });
    selector.getHahaha.should.be.an('function');
  });

  it('should make selector successfully', () => {
    const category = 'hahaha';
    const defaultState = {
      name: 'lala',
      phone: 3345678,
    };

    const { selector } = knifeMaker.make({
      category,
      defaultState,
    });

    // test
    const test = {
      name: 'kychen',
      phone: 8765433,
    };
    const state = {
      myTestKnifeMaker: {
        [category]: test,
      },
    };

    const testcases = {
      getHahaha: test,
      getHahahaName: test.name,
      getHahahaPhone: test.phone,
    };
    _.forEach(testcases, (value, key) => {
      selector[key](state).should.to.eql(value);
    });
  });
});
