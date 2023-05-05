import { rest } from "msw";
import { server } from "../../mocks/server";
import { fetchTodos } from "../slices/todoSlice";

const mockTodos = [{ id: 1, text: "Do order at room" }];

describe("todos async thunk", () => {
  it("should fetch todos with fulfiled response", async () => {
    const dispatch = jest.fn(
      server.use(
        rest.get(
          "https://jsonplaceholder.typicode.com/todos",
          (req, res, ctx) => {
            return res(ctx.json(mockTodos));
          }
        )
      ) as jest.MockedFunction<any>
    );

    const thunk = fetchTodos();
    await thunk(dispatch, () => {}, null);

    const { calls } = dispatch.mock;
    const [first, second] = calls;

    expect(first[0].type).toBe("todos/fetchTodos/pending");
    expect(second[0].type).toBe("todos/fetchTodos/fulfilled");
    expect(second[0].payload).toEqual(mockTodos);
    expect(dispatch).toHaveBeenCalled();
  });

  it("should fetch todos with rejected response", async () => {
    const dispatch = jest.fn(
      server.use(
        rest.get(
          "https://jsonplaceholder.typicode.com/todos",
          (req, res, ctx) => {
            return res(ctx.status(500));
          }
        )
      ) as jest.MockedFunction<any>
    );

    await fetchTodos()(dispatch, () => {}, null);

    const { calls } = dispatch.mock;

    const [first, second] = calls;

    expect(first[0].type).toBe(fetchTodos.pending.type);
    expect(second[0].type).toBe(fetchTodos.rejected.type);
    expect(second[0].meta.rejectedWithValue).toBeTruthy();
    expect(second[0].payload).toBe("Went wrong of fetching data");
  });
});
