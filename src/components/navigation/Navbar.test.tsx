import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navigation from "./Navbar";

afterEach(() => {
  cleanup();
});

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const mocks: MockedResponse[] = [];

test("navigation bar renders to the screen", async () => {
  const { findByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Navigation />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  expect(findByTestId("navbarTitle")).toBeDefined();
});

// test("clicking navigation bar menu item changes URL", async () => {
//   const { findByTestId } = render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <Navigation />
//     </MockedProvider>,
//     {
//       wrapper: MemoryRouter,
//     }
//   );
//   expect(await findByTestId("navbar-link-characters")).toBeDefined();
//   fireEvent.click(await findByTestId("navbar-link-characters"));
//   await act(async () => {
//     await new Promise((resolve) => setTimeout(resolve, 0));
//   });
//   expect(await screen.findByTestId("episodes-heading")).toBeDefined();
// });
