export default {
  actionMap: [
    'addTodo',
    'deleteTodo',
    'editTodo',
    'completeTodo',
    'completeAll',
    'clearCompleted',
  ],
  reducerMap: ({
    todo: { addTodo, deleteTodo, editTodo, completeTodo, completeAll, clearCompleted },
  }) => ({
    [addTodo]: (state, { text }) => ({
      list: [
        ...state.list,
        {
          id: state.list.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text,
        },
      ],
    }),

    [deleteTodo]: (state, { id }) => ({
      list: state.list.filter((todo) => todo.id !== id),
    }),

    [editTodo]: (state, { id, text }) => ({
      list: state.list.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    }),

    [completeTodo]: (state, { id }) => ({
      list: state.list.map((todo) => (
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )),
    }),

    [completeAll]: (state) => {
      const areAllMarked = state.list.every((todo) => todo.completed);

      return {
        list: state.list.map((todo) => ({
          ...todo,
          completed: !areAllMarked,
        })),
      };
    },

    [clearCompleted]: (state) => ({
      list: state.list.filter((todo) => todo.completed === false),
    }),
  }),
  defaultState: {
    list: [{
      text: 'Use Redux',
      completed: false,
      id: 0,
    }],
  },
};
