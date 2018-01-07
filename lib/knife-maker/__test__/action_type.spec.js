import _ from 'lodash';
import KnifeMaker from './../';

describe('test KnifeMaker actionType', () => {
  const namespace = 'my-test-knife-maker';
  const knifeMaker = new KnifeMaker({ namespace });

  it('should get the empty actionType with empty actionMap', () => {
    const { action } = knifeMaker.make({});

    action.should.to.eql({});
  });

  it('should make actionType successfully', () => {
    const category = 'hahaha';
    const { actionType } = knifeMaker.make({
      category,
      actionMap: [
        'testA1',
        'testB2',
        'testC3',
      ],
    });

    const testcases = [
      { action: actionType.testA1, result: `NS@${namespace}@CAT@${category}@ACT@testA1@` },
      { action: actionType.testB2, result: `NS@${namespace}@CAT@${category}@ACT@testB2@` },
      { action: actionType.testC3, result: `NS@${namespace}@CAT@${category}@ACT@testC3@` },
    ];
    _.forEach((testcases), ({ action, result }) => action.should.to.eql(result));
  });
});
