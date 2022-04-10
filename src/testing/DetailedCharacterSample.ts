const DETAILED_CHARACTER_SAMPLE = {
  character: {
    __typename: "Character",
    id: 1,
    name: "Rick Sanchez",
    species: "Human",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      __typename: "Origin",
    },
    location: {
      name: "Citadel of Ricks",
      __typename: "Location",
    },
    status: "Alive",
    type: "",
    episode: [
      {
        id: "1",
        name: "Pilot",
        episode: "S01E01",
        air_date: "December 2, 2013",
        created: "2017-11-10T12:56:33.798Z",
        __typename: "Episode",
      },
    ],
    created: "2017-11-04T18:48:46.250Z",
  },
};

export default DETAILED_CHARACTER_SAMPLE;
