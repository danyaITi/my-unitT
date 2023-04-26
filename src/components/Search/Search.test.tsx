import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Search from "./Search";

const onChange = jest.fn();

describe("Search component", () => {
  it("Search renders", () => {
    render(
      <Search value="" onChange={onChange} placeholder="Лучший поиск">
        Find:
      </Search>
    );

    expect(screen.getByText(/find/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Лучший поиск/i)).toBeInTheDocument();
  });

  it("children is null", () => {
    render(<Search value="" onChange={onChange} />);

    expect(screen.getByText(/лейбл/i)).toBeInTheDocument();
  });

  it("placeholder is null", () => {
    render(<Search value="" onChange={onChange} />);

    expect(screen.getByPlaceholderText(/поиск/i)).toBeInTheDocument();
  });

  it("onChange works", () => {
    render(
      <Search value="" onChange={onChange} placeholder="Лучший поиск">
        Find:
      </Search>
    );

    userEvent.type(screen.getByRole("textbox"), "Hello, World!");

    expect(onChange).toBeCalled();
  });

  it("dynamic styles works", () => {
    render(<Search value="asdfs" onChange={onChange} />);

    expect(screen.getByText("Лейбл")).toHaveClass("label");
    expect(screen.getByRole("textbox")).toHaveClass("active");
  });

  it("Search snapshot", () => {
    const search = render(
      <Search value="" onChange={onChange} placeholder="Лучший поиск">
        Find:
      </Search>
    );

    expect(search).toMatchSnapshot();
  });
});
