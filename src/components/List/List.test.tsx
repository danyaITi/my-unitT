import { render, screen } from "@testing-library/react";
import List from "./List";

const data = ["react5", "redux", "typescript"];

describe("List component", () => {
  it("List render", () => {
    render(<List data={data} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText(/react/)).toBeInTheDocument();
  });

  it("List render without data", () => {
    render(<List data={[]} />);

    expect(screen.queryByRole("list")).toBeNull();
    expect(
      screen.getByRole("heading", { name: /Список пуст/ })
    ).toBeInTheDocument();
  });

  it("Snapshot list with data", () => {
    const list = render(<List data={data} />);

    expect(list).toMatchSnapshot();
  });

  it("Snapshot list without data", () => {
    const list = render(<List data={[]} />);

    expect(list).toMatchSnapshot();
  });
});
