import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TodoList from "./TodoList";
import * as reduxHooks from "react-redux";
import * as actions from "../../store/slices/todoSlice";

jest.mock("react-redux");
const dispatch = jest.fn();

const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
const mockedUseDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("TodoList component", () => {
  it("should render with empty array", () => {
    mockedUseSelector.mockReturnValue([]);
    render(<TodoList />);

    expect(screen.getByText(/список Todos пуст!/i)).toBeInTheDocument();

    expect(screen.queryByRole("list")).toBeNull();

    expect(screen.queryByText(/redux/i)).toBeNull();
  });

  it("should render with not empty array", () => {
    mockedUseSelector.mockReturnValue([
      { text: "Redux", completed: false, id: 1 },
    ]);
    render(<TodoList />);

    expect(screen.queryByText(/список todos пуст!/i)).toBeNull();

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();

    expect(screen.getByText(/redux/i)).toBeInTheDocument();
  });

  it("should work dispatch actions", async () => {
    mockedUseDispatch.mockReturnValue(dispatch);
    mockedUseSelector.mockReturnValue([
      { text: "Redux", completed: false, id: 1 },
    ]);

    render(<TodoList />);

    const mockedDeleteTodo = jest.spyOn(actions, "removeTodo");
    const mockedToggleComplete = jest.spyOn(actions, "toggleComplete");

    // toggleTodo

    userEvent.click(screen.getByRole("checkbox"));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedToggleComplete).toHaveBeenCalledWith(1);

    // deleteTodo
    userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(mockedDeleteTodo).toHaveBeenCalledWith(1);
  });
});
