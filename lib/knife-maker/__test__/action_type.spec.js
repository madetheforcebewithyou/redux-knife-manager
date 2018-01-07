import _ from 'lodash';
import KnifeMaker from './../';

describe('test KnifeMaker actionType', () => {
  const namespace = 'my-test-knife-maker';
  const knifeMaker = new KnifeMaker({ namespace });
  const constantNamespace = _.join(_.split(namespace, '-'), '_').toUpperCase();

  it('should get the empty actionType with empty actionMap', () => {
    const { action } = knifeMaker.make({});

    action.should.to.eql({});
  });

  it('should make actionType successfully', () => {
    const { actionType } = knifeMaker.make({
      category: 'hahaha',
      actionMap: [
        'testA1',
        'testB2',
        'testC3',
      ],
    });

    const testcases = [
      { action: actionType.testA1, result: `${constantNamespace}@HAHAHA@TEST_A_1` },
      { action: actionType.testB2, result: `${constantNamespace}@HAHAHA@TEST_B_2` },
      { action: actionType.testC3, result: `${constantNamespace}@HAHAHA@TEST_C_3` },
    ];
    _.forEach((testcases), ({ action, result }) => action.should.to.eql(result));
  });

  it('should make actionType with timestamp successfully', () => {
    const { actionType } = (new KnifeMaker({ namespace, actionTypeTimestamp: true })).make({
      category: 'hahaha',
      actionMap: [
        'testA1',
        'testB2',
        'testC3',
      ],
    });

    const testcases = [
      {
        action: actionType.testA1,
        typePattern: new RegExp(`${constantNamespace}@HAHAHA@TEST_A_1@[0-9]+`),
      },
      {
        action: actionType.testB2,
        typePattern: new RegExp(`${constantNamespace}@HAHAHA@TEST_B_2@[0-9]+`),
      },
      {
        action: actionType.testC3,
        typePattern: new RegExp(`${constantNamespace}@HAHAHA@TEST_C_3@[0-9]+`),
      },
    ];

    _.forEach((testcases), ({ action, typePattern }) => {
      typePattern.test(action).should.to.eql(true);
    });
  });
});
