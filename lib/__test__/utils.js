import uuidv4 from 'uuid/v4';

export function generateConfig() {
  const category = uuidv4();
  const config = {
    defaultState: {
      value: 0,
    },
    actionMap: [
      'increase',
      'decrease',
    ],
    reducerMap: ({ increase, decrease }) => ({
      [increase]: (state, action) => ({
        value: state.value + action.value,
      }),

      [decrease]: (state, action) => ({
        value: state.value - action.value,
      }),
    }),
  };

  return { category, config };
}
