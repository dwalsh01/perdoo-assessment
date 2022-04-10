import { gql } from "@apollo/client";

const CHARACTER_INFORMATION = gql`
  fragment CharacterInformation on Character {
    id
    name
    species
    image
    gender
    origin {
      name
    }
    location {
      name
    }
  }
`;

export default CHARACTER_INFORMATION;
