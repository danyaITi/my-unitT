import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
}

export const initialState: TodoState = {
  items: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items = [...state.items, action.payload];
    },

    toggleComplete: (state, action: PayloadAction<number>) => {
      const toggledTodo = state.items.find(
        (todo) => todo.id === action.payload
      );
      toggledTodo ? (toggledTodo.completed = !toggledTodo?.completed) : null;
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      const filteredTodos = state.items.filter(
        (todo) => todo.id !== action.payload
      );
      state.items = filteredTodos;
    },
  },
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
