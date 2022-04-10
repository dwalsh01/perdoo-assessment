import { gql } from "@apollo/client";

const GET_ALL_EPISODES = gql`
  query GetAllEpisodes {
    episodes {
      results {
        id
        name
        episode
        air_date
        characters {
          id
          name
        }
      }
    }
  }
`;

export default GET_ALL_EPISODES;
