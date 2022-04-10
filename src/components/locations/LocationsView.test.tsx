import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GET_ALL_LOCATIONS from "../../graphql/queries/getAllLocations";
import LOCATION_SAMPLE from "../../testing/LocationSample";
import LocationsView from "./LocationsView";

afterEach(() => {
  cleanup();
});

export const locationsMocks: MockedResponse[] = [
  {
    request: { query: GET_ALL_LOCATIONS },
    result: {
      data: {
        locations: {
          results: [LOCATION_SAMPLE],
        },
      },
    },
  },
];

test("shows the loading message while fetching data", async () => {
  render(
    <MockedProvider mocks={locationsMocks} addTypename={false}>
      <LocationsView />
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
      <LocationsView />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  expect(await screen.findByTestId("ErrorAlert")).toBeDefined();
});

test("render a sample location in the LocationsView", async () => {
  render(
    <MockedProvider mocks={locationsMocks}>
      <LocationsView />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );

  // fix for issue regarding waiting on data to be fetched
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  const result = await screen.findByText("Earth (C-137)");
  expect(result).toBeInTheDocument();
});
