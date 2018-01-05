import reduxKnifeManager from 'redux-knife-manager';
import todoConfig from './todo.js';

// add knives
reduxKnifeManager.addKnife('todo', todoConfig);

const knives = reduxKnifeManager.getKnives();
const rootReducer = reduxKnifeManager.getRootReducer();

export {
  knives,
  rootReducer,
};

