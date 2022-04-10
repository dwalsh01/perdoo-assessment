import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NavigateButton from "./NavigateButton";

afterEach(() => {
  cleanup();
});

// react-router-dom useNavigate() function mock
// for testing purposes
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

test("navigate to a different after pressing the button", async () => {
  const { findByTestId } = render(<NavigateButton id={1} to="characters" />, {
    wrapper: MemoryRouter,
  });

  fireEvent.click(await findByTestId(/viewMoreButton-1/i));
  expect(mockedUsedNavigate).toBeCalledTimes(1);
});
