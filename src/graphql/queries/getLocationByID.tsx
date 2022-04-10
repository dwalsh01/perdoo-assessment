import { gql } from "@apollo/client";

const GET_LOCATION_BY_ID = gql`
  query GetLocationByID($id: [ID!]!) {
    locationsByIds(ids: $id) {
      id
      name
      dimension
      residents {
        id
        name
      }
    }
  }
`;

export default GET_LOCATION_BY_ID;
