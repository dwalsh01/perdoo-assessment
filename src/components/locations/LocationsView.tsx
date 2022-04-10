import { useQuery } from "@apollo/client";
import Table from "../table/Table";

import { useMemo } from "react";

import { Box, Heading, Spinner } from "@chakra-ui/react";
import ErrorAlert from "../errorAlert/ErrorAlert";
import locationsHeader from "./LocationsHeader";
import GET_ALL_LOCATIONS from "../../graphql/queries/getAllLocations";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const LocationsView = () => {
  const { data, loading, error } = useQuery(GET_ALL_LOCATIONS);
  const navigate = useNavigate();
  const columns = useMemo(() => locationsHeader(navigate), []);
  if (loading) {
    return <Loading />;
  }
  if (error && !data) {
    return (
      <ErrorAlert
        title="Error Fetching Data"
        description="Please try again later. If the problem persists, please contact customer care."
      />
    );
  }
  return (
    <>
      <Heading textAlign="center">Locations Information</Heading>
      <Table data={data.locations.results} columns={columns} />
    </>
  );
};

export default LocationsView;
