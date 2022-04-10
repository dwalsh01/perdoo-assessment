import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import GET_ALL_EPISODES from "../../graphql/queries/getAllEpisodes";
import EpisodeView from "./EpisodesView";
import EPISODE_SAMPLE from "../../testing/EpisodeSample";

export const episodeMocks: MockedResponse[] = [
  {
    request: { query: GET_ALL_EPISODES },
    result: {
      data: {
        episodes: {
          results: [EPISODE_SAMPLE],
        },
      },
    },
  },
];

test("shows the loading message while fetching", async () => {
  render(
    <MockedProvider mocks={episodeMocks} addTypename={false}>
      <EpisodeView />
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
      <EpisodeView />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  expect(await screen.findByTestId("ErrorAlert")).toBeDefined();
});

test("render a sample episode in the table", async () => {
  render(
    <MockedProvider mocks={episodeMocks}>
      <EpisodeView />
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
