import { rest } from "msw";

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Daniel", id: 1 },
        { name: "Mark", id: 2 },
        { name: "Petr", id: 3 },
      ])
    );
  }),
];
