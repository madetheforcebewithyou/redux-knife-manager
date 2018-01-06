import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import { knives } from './../knives';

const { action, selector } = knives.todo;
const { getList } = selector;

const App = ({ todos, actions }) => (
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
);

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todos: getList(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(action, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
