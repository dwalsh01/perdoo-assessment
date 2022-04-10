import { NavigateFunction } from "react-router-dom";
import NavigateButton from "../../routes/NavigateButton";

const locationsHeader = (navigate: NavigateFunction) => {
  return [
    {
      Header: "Location Information",
      columns: [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Type",
          accessor: "type",
        },
        {
          Header: "Dimemsion",
          accessor: "dimension",
        },
        {
          Header: "Action",
          acessor: "id",
          Cell: ({ row }: any) => (
            <NavigateButton to="locations" id={row.original.id} />
          ),
        },
      ],
    },
  ];
};

export default locationsHeader;
