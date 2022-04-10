import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import GET_CHARACTER_BY_ID from "../../graphql/queries/getCharacterByID";
import DETAILED_CHARACTER_SAMPLE from "../../testing/DetailedCharacterSample";
import CharacterPage from "./CharacterPage";

afterEach(() => {
  cleanup();
});

const characterMock: MockedResponse[] = [
  {
    request: {
      query: GET_CHARACTER_BY_ID,
    },
    result: {
      data: DETAILED_CHARACTER_SAMPLE,
    },
  },
];

test("shows the loading message while fetching", async () => {
  render(
    <MockedProvider mocks={characterMock} addTypename={false}>
      <CharacterPage />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  expect(screen.getByTestId("LoadingSpinner")).toBeDefined();
});

test("shows the error message after failing to fetch data", async () => {
  const errorMock: MockedResponse[] = [];

  render(
    <MockedProvider mocks={errorMock}>
      <CharacterPage />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  expect(await screen.findByTestId("ErrorAlert")).toBeDefined();
});

test("shows a sample character in the view", async () => {
  render(
    <MockedProvider mocks={characterMock} addTypename={false}>
      <CharacterPage />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  // fix for issue regarding waiting on data to be fetched
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  const result = await screen.findByText(/Rick Sanchez/i);
  expect(result).toBeInTheDocument();
});
