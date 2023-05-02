import { selectCount } from "../selectors/counterSelector";
import { selectTodos } from "../selectors/todoSelector";
import { Todo } from "../slices/todoSlice";

describe("Counter selector", () => {
  it("should select value from initState", () => {
    const count = 1;

    const result = selectCount({
      counter: { value: count },
      todos: { items: [] },
    });

    expect(result).toEqual(count);
  });
});

describe("Todos selector", () => {
  it("should select items from initState", () => {
    const items: Todo[] = [{ text: "Redux", completed: false, id: 1 }];

    const result = selectTodos({ todos: { items }, counter: { value: 0 } });

    expect(result).toEqual(items);
  });
});
