import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import GET_EPISODE_BY_ID from "../../graphql/queries/getEpisodesByID";
import DETAILED_EPISODE_SAMPLE from "../../testing/DetailedEpisodeSample";
import EpisodePage from "./EpisodePage";

afterEach(() => {
  cleanup();
});

const episodeMock: MockedResponse[] = [
  {
    request: {
      query: GET_EPISODE_BY_ID,
    },
    result: {
      data: {
        episodesByIds: [
          {
            id: "1",
            episode: "S01E01",
            name: "Pilot",
            air_date: "December 2, 2013",
            characters: [
              {
                id: "1",
                name: "Rick Sanchez",
                species: "Human",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                gender: "Male",
                origin: {
                  name: "Earth (C-137)",
                  __typename: "Origin",
                },
                location: {
                  name: "Citadel of Ricks",
                  __typename: "Location",
                },
                __typename: "Character",
              },
            ],
            created: "2017-11-10T12:56:33.798Z",
            __typename: "Episode",
          },
        ],
      },
    },
  },
];

test("shows the loading message while fetching", async () => {
  render(
    <MockedProvider mocks={episodeMock}>
      <EpisodePage />
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
      <EpisodePage />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  expect(await screen.findByTestId("ErrorAlert")).toBeDefined();
});

test("shows a sample episode in the view", async () => {
  render(
    <MockedProvider mocks={episodeMock}>
      <EpisodePage />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  // fix for issue regarding waiting on data to be fetched
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  const result = await screen.findByText(/Pilot/i);
  expect(result).toBeInTheDocument();
});
