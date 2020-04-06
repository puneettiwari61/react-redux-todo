import { v4 as uuid } from "uuid";
import { ADD_TODO, TOGGLE_TODO, CHANGE_TAB, DELETE_TODO } from "../types";

let initialState = JSON.parse(localStorage.getItem("myTodos")) || {
  allTodos: [],
  activeTab: "all"
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return (state = {
        ...state,
        allTodos: [
          ...state.allTodos,
          { completed: false, id: uuid(), todo: action.payload }
        ]
      });
    case DELETE_TODO:
      console.log(action);
      return (state = {
        ...state,
        allTodos: [...state.allTodos.filter(t => action.payload !== t.id)]
      });

    case TOGGLE_TODO:
      console.log(action);
      return (state = {
        ...state,
        allTodos: [
          ...state.allTodos.map(t => {
            if (action.payload === t.id) {
              t.completed = !t.completed;
            }
            return t;
          })
        ]
      });
    case CHANGE_TAB:
      return (state = {
        ...state,
        activeTab: action.payload
      });

    default:
      return state;
  }
}
