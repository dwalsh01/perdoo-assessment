import { gql } from "@apollo/client";

const GET_ALL_LOCATIONS = gql`
  query GetAllLocations {
    locations {
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
        }
      }
    }
  }
`;

export default GET_ALL_LOCATIONS;
