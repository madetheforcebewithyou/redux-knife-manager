import KnifeMaker from './../';

describe('test KnifeMaker reducer', () => {
  const namespace = 'my-test-knife-maker';
  const knifeMaker = new KnifeMaker({ namespace });

  const actionMap = [
    'increase',
    'decrease',
  ];

  const defaultState = {
    value: 0,
  };

  const reducerMap = ({ increase, decrease }) => ({
    [increase]: (state, action) => ({
      value: state.value + action.value,
    }),

    [decrease]: (state, action) => ({
      value: state.value - action.value,
    }),
  });

  let knife;
  it('should make reducer successfully', () => {
    knife = knifeMaker.make({
      category: 'haha',
      defaultState,
      actionMap,
      reducerMap,
    });
  });

  it('check defaultState', () => {
    const { reducerFactory, actionType } = knife;
    const reducer = reducerFactory(actionType);

    reducer().should.to.eql(defaultState);
  });

  it('check increase', () => {
    const { reducerFactory, actionType, action } = knife;
    const reducer = reducerFactory(actionType);

    reducer({ value: 1 }, action.increase({ value: 10 })).should.to.eql({ value: 11 });
  });

  it('check decrease', () => {
    const { reducerFactory, actionType, action } = knife;
    const reducer = reducerFactory(actionType);

    reducer({ value: 1 }, action.decrease({ value: 10 })).should.to.eql({ value: -9 });
  });
});
