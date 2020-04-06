import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import {
  addTodoAction,
  deleteTodoAction,
  toggleTodoAction
} from "./store/actions";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todo: ""
    };
  }

  handleInput = e => {
    this.setState({ todo: e.target.value });
  };

  handleDel = (e, id) => {
    console.log("del", id);
    this.props.dispatch(deleteTodoAction(id));
  };

  handleComplete = id => {
    console.log("completed", id);
    this.props.dispatch(toggleTodoAction(id));
  };

  addTodo = e => {
    console.log(this.state.todo);
    this.props.dispatch(addTodoAction(this.state.todo));
    this.setState({ todo: "" });
  };
  render() {
    console.log(this.props, "main");

    return (
      <>
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <input
            type="text"
            name="todo"
            onChange={this.handleInput}
            value={this.state.todo}
            onKeyDown={e =>
              e.keyCode === 13
                ? this.props.dispatch({ type: "add", todo: this.state.todo })
                : ""
            }
          />
          <button onClick={this.addTodo}>Add Todo</button>
          <ul>
            {this.props.allTodos.map(t => {
              return (
                <li className="flex">
                  <input
                    type="checkbox"
                    onChange={() => this.handleComplete(t.id)}
                    checked={t.completed ? true : false}
                  />
                  <p
                    style={
                      t.completed
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" }
                    }
                  >
                    {t.todo}
                  </p>
                  <span onClick={e => this.handleDel(e, t.id)}>X</span>
                </li>
              );
            })}
          </ul>
          <Footer />
        </div>
      </>
    );
  }
}

function toProps({ allTodos, activeTab }) {
  function filterTodo(todos, tab) {
    switch (tab) {
      case "all":
        return todos;
      case "completed":
        return todos.filter(t => t.completed);
      case "active":
        return todos.filter(t => !t.completed);
      default:
        break;
    }
  }
  return {
    allTodos: filterTodo(allTodos, activeTab),
    activeTab
  };
}

export default connect(toProps)(App);
