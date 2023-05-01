import { render, screen } from "@testing-library/react";
import Users from "./Users";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("Users component", () => {
  it("Users renders", () => {
    render(<Users />);

    expect(screen.getByText(/users/i)).toBeInTheDocument();
  });

  it("list of users are render", async () => {
    render(<Users />);

    expect(await screen.findAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryByText(/wrong/i)).toBeNull();
  });

  it("list of users don't render", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(<Users />);

    expect(await screen.findByText(/wrong/i)).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
