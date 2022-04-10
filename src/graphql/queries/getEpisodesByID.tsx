import { gql } from "@apollo/client";
import CHARACTER_INFORMATION from "../fragments/characterFragment";

const GET_EPISODE_BY_ID = gql`
  ${CHARACTER_INFORMATION}
  query GetEpisodeByID($id: [ID!]!) {
    episodesByIds(ids: $id) {
      id
      episode
      name
      air_date
      characters {
        ...CharacterInformation
      }
      created
    }
  }
`;

export default GET_EPISODE_BY_ID;
