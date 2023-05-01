import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { act } from "react-dom/test-utils";

const renderWithRouter = (ui: JSX.Element, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent,
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

// describe("App component", () => {
//   it("full app rendering/navigating", async () => {
//     render(<App />, { wrapper: BrowserRouter });

//     expect(screen.getByText(/You are home page/i)).toBeInTheDocument();

//     await userEvent.click(screen.getByText(/about/i));

//     expect(screen.getByText(/You are about page/i)).toBeInTheDocument();
//   });

//   it("render noMatch page", () => {
//     const badRoute = "/asdasdasd";

//     render(
//       <MemoryRouter initialEntries={[badRoute]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(screen.getByText(/no match/i)).toBeInTheDocument();
//   });
// });
describe("App component", () => {
  it("full app rendering/navigating", async () => {
    const { user } = renderWithRouter(<App />);

    expect(screen.getByText(/You are home page/i)).toBeInTheDocument();

    act(() => {
      user.click(screen.getByText(/about/i));
    });

    expect(screen.getByText(/You are about page/i)).toBeInTheDocument();
  });

  it("render noMatch page", () => {
    const badRoute = "/asdasdasd";

    renderWithRouter(<App />, { route: badRoute });

    expect(screen.getByText(/no match/i)).toBeInTheDocument();
  });
});
