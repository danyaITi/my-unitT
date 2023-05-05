import todoReducer, { fetchTodos } from "../slices/todoSlice";

const initialState = {
  items: [],
  status: null,
  error: null,
};

describe("Todos extra reducers", () => {
  it('should change status with "fetchTodos.pending" action', () => {
    const state = todoReducer(initialState, fetchTodos.pending("pending"));

    expect(state.status).toBe("pending");
    expect(state.error).toBeNull();
  });

  it('should get data "fetchTodos.fuilfilled" action', () => {
    const mockTodos = [{ id: 1, text: "Do order at room" }];
    const state = todoReducer(
      initialState,
      fetchTodos.fulfilled(mockTodos, "fulfilled")
    );

    expect(state.status).toBe("fulfilled");
    expect(state.items).toEqual(mockTodos);
    expect(state.error).toBeNull();
  });

  it('should change status and get error with "fetchTodos.rejected" action', () => {
    const action = {
      type: fetchTodos.rejected.type,
      payload: "Went wrong of fetching data",
    };
    const state = todoReducer(initialState, action);

    expect(state).toEqual({
      items: [],
      status: "rejected",
      error: "Went wrong of fetching data",
    });
  });
});
