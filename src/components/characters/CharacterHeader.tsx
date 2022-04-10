import { Avatar } from "@chakra-ui/react";

import NavigateButton from "../../routes/NavigateButton";

const characterHeader = () => {
  return [
    {
      Header: "Character Information",
      columns: [
        {
          Header: "Photo",
          accessor: "image",
          Cell: ({ row }: any) => (
            <Avatar
              size={"xl"}
              src={row.original.image}
              css={{
                border: "2px solid white",
              }}
            />
          ),
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Species",
          accessor: "species",
        },
        {
          Header: "Origin",
          accessor: "origin.name",
        },
        {
          Header: "Location",
          accessor: "location.name",
        },
        {
          Header: "Action",
          acessor: "id",
          Cell: ({ row }: any) => (
            <NavigateButton to="characters" id={row.original.id} />
          ),
        },
      ],
    },
  ];
};

export default characterHeader;
