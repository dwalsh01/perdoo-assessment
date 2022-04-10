import { cleanup, render, screen } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

const mocks: MockedResponse[] = [];

test("renders App Component", () => {
  render(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    </BrowserRouter>
  );
  const title = screen.getByText("Rick & Morty API Explorer");
  expect(title).toBeInTheDocument();
});
