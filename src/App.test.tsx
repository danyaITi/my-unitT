import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App component", () => {
  it("renders learn react link", () => {
    render(<App />);
    screen.debug();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("typing in searchbow works", () => {
    render(<App />);

    expect(screen.queryByDisplayValue("React")).toBeNull();

    userEvent.type(screen.getByRole("textbox"), "React");

    expect(screen.queryByDisplayValue(/react/i)).toBeInTheDocument();
  });

  it("search's filtering is works", () => {
    render(<App />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();

    userEvent.type(screen.getByRole("textbox"), "react");

    expect(screen.queryByDisplayValue("Angular")).toBeNull();
    expect(screen.queryByText("React")).toBeInTheDocument();
  });

  it("search snapshot", () => {
    const search = render(<App />);

    expect(search).toMatchSnapshot();
  });
});
