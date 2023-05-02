import counterReducer, { decrement, increment } from "../slices/counterSlice";
import todoReducer, {
  addTodo,
  initialState,
  toggleComplete,
  removeTodo,
} from "../slices/todoSlice";

describe("Counter slice", () => {
  it("should return default initState at first render", () => {
    const result = counterReducer(undefined, { type: "" });

    expect(result).toEqual({ value: 0 });
  });

  it("should increment with 'increment' action", () => {
    const action = { type: increment.type };
    const result = counterReducer({ value: 0 }, action);

    expect(result.value).toEqual(1);
  });

  it("should increment with 'decrement' action", () => {
    const action = { type: decrement.type };
    const result = counterReducer({ value: 1 }, action);

    expect(result.value).toEqual(0);
  });
});

describe("todo slice", () => {
  it("should return default initState at first render", () => {
    const result = todoReducer(initialState, { type: "" });

    expect(result).toEqual(initialState);
  });

  it("should add todo with 'addTodo' action", () => {
    const action = {
      type: addTodo.type,
      payload: { text: "React", completed: false, id: 1 },
    };
    const result = todoReducer(initialState, action);

    expect(result.items[0].id).toEqual(1);
  });

  it("should toggle todo completed with 'toggleComplete' action", () => {
    const todos = [{ text: "Redux", completed: false, id: 1 }];
    const action = {
      type: toggleComplete.type,
      payload: 1,
    };
    const result = todoReducer({ items: todos }, action);

    expect(result.items[0].completed).toBe(true);

    if (!result.items[1]) {
      expect(result.items[1]).toBeUndefined();
    }
  });

  it("should remove todo completed with 'removeTodo' action", () => {
    const todos = [
      { text: "Redux", completed: false, id: 1 },
      { text: "React", completed: false, id: 2 },
    ];
    const action = {
      type: removeTodo.type,
      payload: 2,
    };
    const result = todoReducer({ items: todos }, action);

    expect(result.items[1]).toBeUndefined();
  });
});
