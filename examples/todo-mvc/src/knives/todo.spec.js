import { knives } from './';

const { reducer, action } = knives.todo;

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual({
      list: [
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        },
      ],
    });
  });

  it('should handle addTodo', () => {
    const text = 'Run the addTodo tests';
    expect(reducer({ list: [] }, action.addTodo({ text })))
    .toEqual({
      list: [
        {
          text,
          completed: false,
          id: 0
        },
      ],
    });
  });

  it('should handle deleteTodo', () => {
    expect(reducer({
        list: [
          {
            text: 'Use Redux',
            completed: false,
            id: 0
          },
          {
            text: 'Run the deleteTodo tests',
            completed: false,
            id: 1
          },
        ],
      },
      action.deleteTodo({ id: 1 }))
    ).toEqual({
      list: [
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        },
      ],
    });
  });

  it('should handle editTodo', () => {
    const newText = 'Fix the editTodo tests';
    expect(reducer({
        list: [
          {
            text: 'Run the editTodo tests',
            completed: false,
            id: 1
          }, {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
      },
      action.editTodo({ text: newText, id: 1 }))
    ).toEqual({
      list: [
        {
          text: newText,
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        },
      ],
    });
  });

  it('should handle completeTodo', () => {
    const text1 = 'Run the completeTodo tests';
    const text2 = 'Use Redux';

    expect(reducer({
        list: [
          {
            text: text1,
            completed: false,
            id: 1
          }, {
            text: text2,
            completed: false,
            id: 0
          }
        ],
      },
      action.completeTodo({ id: 1 }))
    ).toEqual({
      list: [
        {
          text: text1,
          completed: true,
          id: 1
        }, {
          text: text2,
          completed: false,
          id: 0
        },
      ],
    });
  });

  it('should handle completeAll', () => {
    const text1 = 'Run the completeAll tests';
    const text2 = 'Use Redux';

    expect(reducer({
        list: [
          {
            text: text1,
            completed: true,
            id: 1
          }, {
            text: text2,
            completed: false,
            id: 0
          },
        ],
      },
      action.completeAll())
    ).toEqual({
      list: [
        {
          text: text1,
          completed: true,
          id: 1
        }, {
          text: text2,
          completed: true,
          id: 0
        },
      ],
    });

    // Unmark if all todos are currently completed
    expect(reducer({
        list: [
          {
            text: text1,
            completed: true,
            id: 1
          }, {
            text: text2,
            completed: true,
            id: 0
          },
        ],
      },
      action.completeAll())
    ).toEqual({
      list: [
        {
          text: text1,
          completed: false,
          id: 1
        }, {
          text: text2,
          completed: false,
          id: 0
        },
      ],
    })
  });

  it('should handle clearCompleted', () => {
    const text1 = 'Run the completeAll tests';
    const text2 = 'Use Redux';

    expect(reducer({
        list: [
          {
            text: text1,
            completed: true,
            id: 1
          }, {
            text: text2,
            completed: false,
            id: 0
          },
        ],
      },
      action.clearCompleted())
    ).toEqual({
      list: [
        {
          text: text2,
          completed: false,
          id: 0
        },
      ],
    })
  });
});
