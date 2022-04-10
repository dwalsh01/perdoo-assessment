import { gql } from "@apollo/client";
import CHARACTER_INFORMATION from "../fragments/characterFragment";

const GET_CHARACTER_BY_ID = gql`
  ${CHARACTER_INFORMATION}

  query GetCharacterByID($id: ID!) {
    character(id: $id) {
      ...CharacterInformation
      status
      type
      gender
      image
      species
      episode {
        id
        name
        episode
        air_date
        created
      }
      created
    }
  }
`;

export default GET_CHARACTER_BY_ID;
