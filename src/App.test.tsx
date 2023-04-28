import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";

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
