import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";
import userEvent from "@testing-library/user-event";

const handleChange = jest.fn();

describe("App component", () => {
  it("renders learn react link", () => {
    render(<App />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("typing in searchbox works", async () => {
    render(<App />);
    expect(screen.queryByDisplayValue("React")).toBeNull();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });

    await screen.findByDisplayValue(/react/i);

    expect(screen.getByDisplayValue(/react/i)).toBeInTheDocument();
  });

  it("search's filtering is works", async () => {
    render(<App />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });

    await screen.findByText(/React/i);

    expect(screen.queryByText("Angular")).toBeNull();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });

  it("search snapshot", () => {
    const search = render(<App />);

    expect(search).toMatchSnapshot();
  });
});

describe("events", () => {
  it("checkbox click", () => {
    render(<input type="checkbox" onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox!);

    expect(handleChange).toHaveBeenCalledTimes(1);

    expect(checkbox).toBeChecked();
  });

  it("focus", () => {
    render(<input type="text" data-testid="focus" />);

    const input = screen.getByTestId("focus");

    expect(input).not.toHaveFocus();

    input.focus();

    expect(input).toHaveFocus();
  });

  it("db click", () => {
    render(<button data-testid="btn" onClick={handleChange}></button>);
    const btn = screen.getByTestId("btn");

    expect(handleChange).not.toBeCalledTimes(2);

    userEvent.dblClick(btn);

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("tab focus", () => {
    render(
      <div>
        <input type="text" data-testid="tab" />
        <input type="checkbox" data-testid="tab" />
        <input type="radio" data-testid="tab" />
      </div>
    );

    const [text, radio, checkbox] = screen.getAllByTestId("tab");

    userEvent.tab();
    expect(text).toHaveFocus();

    userEvent.tab();
    expect(radio).toHaveFocus();

    userEvent.tab();
    expect(checkbox).toHaveFocus();
  });

  it("select options", () => {
    render(
      <select multiple>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    userEvent.selectOptions(screen.getByRole("listbox"), "2");
    expect(screen.getByText("B").selected).toBeTruthy();

    userEvent.selectOptions(screen.getByRole("listbox"), "1");
    userEvent.deselectOptions(screen.getByRole("listbox"), "2");
    expect(screen.getByText("A").selected).toBeTruthy();
    expect(screen.getByText("B").selected).toBeFalsy();
  });
});
