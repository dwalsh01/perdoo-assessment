import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import GET_ALL_CHARACTERS from "../../graphql/queries/getAllCharacters";
import CHARACTER_SAMPLE from "../../testing/CharacterSample";
import CharacterView from "./CharacterView";

export const characterMocks: MockedResponse[] = [
  {
    request: { query: GET_ALL_CHARACTERS },
    result: {
      data: {
        characters: {
          results: [CHARACTER_SAMPLE],
        },
      },
    },
  },
];

test("shows the loading message while fetching", async () => {
  render(
    <MockedProvider mocks={characterMocks} addTypename={false}>
      <CharacterView />
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
      <CharacterView />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  expect(await screen.findByTestId("ErrorAlert")).toBeDefined();
});

test("render a sample character in the table", async () => {
  render(
    <MockedProvider mocks={characterMocks}>
      <CharacterView />
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
