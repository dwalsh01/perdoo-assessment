import { gql } from "@apollo/client";
import CHARACTER_INFORMATION from "../fragments/characterFragment";

const GET_ALL_CHARACTERS = gql`
  ${CHARACTER_INFORMATION}

  query GetAllCharacters {
    characters {
      results {
        ...CharacterInformation
      }
    }
  }
`;

export default GET_ALL_CHARACTERS;
