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
    expect(reducer({ list: [] }, action.addTodo({ text: 'Run the tests' })))
    .toEqual({
      list: [
        {
          text: 'Run the tests',
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
            text: 'Run the tests',
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
    expect(reducer({
        list: [
          {
            text: 'Run the tests',
            completed: false,
            id: 1
          }, {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
      },
      action.editTodo({ text: 'Fix the tests', id: 1 }))
    ).toEqual({
      list: [
        {
          text: 'Fix the tests',
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
    expect(reducer({
        list: [
          {
            text: 'Run the tests',
            completed: false,
            id: 1
          }, {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
      },
      action.completeTodo({ id: 1 }))
    ).toEqual({
      list: [
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        },
      ],
    });
  });

  it('should handle completeAll', () => {
    expect(reducer({
        list: [
          {
            text: 'Run the tests',
            completed: true,
            id: 1
          }, {
            text: 'Use Redux',
            completed: false,
            id: 0
          },
        ],
      },
      action.completeAll())
    ).toEqual({
      list: [
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: true,
          id: 0
        },
      ],
    });

    // Unmark if all todos are currently completed
    expect(reducer({
        list: [
          {
            text: 'Run the tests',
            completed: true,
            id: 1
          }, {
            text: 'Use Redux',
            completed: true,
            id: 0
          },
        ],
      },
      action.completeAll())
    ).toEqual({
      list: [
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        },
      ],
    })
  });

  it('should handle clearCompleted', () => {
    expect(reducer({
        list: [
          {
            text: 'Run the tests',
            completed: true,
            id: 1
          }, {
            text: 'Use Redux',
            completed: false,
            id: 0
          },
        ],
      },
      action.clearCompleted())
    ).toEqual({
      list: [
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        },
      ],
    })
  });
});
