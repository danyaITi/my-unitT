import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  items: Todo[];
  status: null | string;
  error?: null | string;
}

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      if (!response.ok) {
        throw new Error("Went wrong of fetching data");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);

export const initialState: TodoState = {
  items: [],
  status: null,
  error: null,
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
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "pending";
      state.error = null;
    }),
      builder.addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "fulfilled";
      }),
      builder.addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "rejected";
      });
  },
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
