import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import GET_LOCATION_BY_ID from "../../graphql/queries/getLocationByID";
import LocationPage from "./LocationPage";

afterEach(() => {
  cleanup();
});

const locationsMock: MockedResponse[] = [
  {
    request: {
      query: GET_LOCATION_BY_ID,
    },
    result: {
      data: {
        locationsByIds: [
          {
            id: "1",
            name: "Earth (C-137)",
            dimension: "Dimension C-137",
            residents: [
              {
                id: "38",
                name: "Beth Smith",
                __typename: "Character",
              },
              {
                id: "45",
                name: "Bill",
                __typename: "Character",
              },
              {
                id: "71",
                name: "Conroy",
                __typename: "Character",
              },
              {
                id: "82",
                name: "Cronenberg Rick",
                __typename: "Character",
              },
              {
                id: "83",
                name: "Cronenberg Morty",
                __typename: "Character",
              },
              {
                id: "92",
                name: "Davin",
                __typename: "Character",
              },
              {
                id: "112",
                name: "Eric McMan",
                __typename: "Character",
              },
              {
                id: "114",
                name: "Ethan",
                __typename: "Character",
              },
              {
                id: "116",
                name: "Evil Beth Clone",
                __typename: "Character",
              },
              {
                id: "117",
                name: "Evil Jerry Clone",
                __typename: "Character",
              },
              {
                id: "120",
                name: "Evil Summer Clone",
                __typename: "Character",
              },
              {
                id: "127",
                name: "Frank Palicky",
                __typename: "Character",
              },
              {
                id: "155",
                name: "Harold",
                __typename: "Character",
              },
              {
                id: "169",
                name: "Jacob",
                __typename: "Character",
              },
              {
                id: "175",
                name: "Jerry Smith",
                __typename: "Character",
              },
              {
                id: "179",
                name: "Jessica",
                __typename: "Character",
              },
              {
                id: "186",
                name: "Joyce Smith",
                __typename: "Character",
              },
              {
                id: "201",
                name: "Leonard Smith",
                __typename: "Character",
              },
              {
                id: "216",
                name: "MC Haps",
                __typename: "Character",
              },
              {
                id: "239",
                name: "Mr. Goldenfold",
                __typename: "Character",
              },
              {
                id: "271",
                name: "Principal Vagina",
                __typename: "Character",
              },
              {
                id: "302",
                name: "Ruben",
                __typename: "Character",
              },
              {
                id: "303",
                name: "Samantha",
                __typename: "Character",
              },
              {
                id: "338",
                name: "Summer Smith",
                __typename: "Character",
              },
              {
                id: "343",
                name: "Tammy Guetermann",
                __typename: "Character",
              },
              {
                id: "356",
                name: "Tom Randolph",
                __typename: "Character",
              },
              {
                id: "394",
                name: "Davin",
                __typename: "Character",
              },
            ],
            __typename: "Location",
          },
        ],
      },
    },
  },
];

test("shows the loading message while fetching", async () => {
  render(
    <MockedProvider mocks={locationsMock} addTypename={false}>
      <LocationPage />
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
      <LocationPage />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  expect(await screen.findByTestId("ErrorAlert")).toBeDefined();
});

test("Shows a location in the view", async () => {
  const { findByText } = render(
    <MockedProvider mocks={locationsMock} addTypename={false}>
      <LocationPage />
    </MockedProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
  // fix for issue regarding waiting on data to be fetched
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  const result = await findByText("Earth (C-137)");
  expect(result).toBeInTheDocument();
});
