import { Text } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

import NavigateButton from "../../routes/NavigateButton";

const episodeHeader = (navigate: NavigateFunction) => {
  return [
    {
      Header: "Episode Information",
      columns: [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Air Date",
          accessor: "air_date",
        },
        {
          Header: "Episode",
          accessor: "episode",
        },
        {
          Header: "Characters",
          id: "characters",
          Cell: ({ row }: any) => (
            <Text>
              {row.original.characters
                .slice(0, 2)
                .map((char: any) => `${char.name}, `)}
              and {row.original.characters.length - 2} more
            </Text>
          ),
        },
        {
          Header: "Action",
          acessor: "id",
          Cell: ({ row }: any) => (
            <NavigateButton to="episodes" id={row.original.id} />
          ),
        },
      ],
    },
  ];
};

export default episodeHeader;
