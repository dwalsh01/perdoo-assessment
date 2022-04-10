import { useQuery } from "@apollo/client";
import { Heading } from "@chakra-ui/react";
import { useMemo } from "react";

import GET_ALL_CHARACTERS from "../../graphql/queries/getAllCharacters";
import ErrorAlert from "../errorAlert/ErrorAlert";
import Loading from "../loading/Loading";
import Table from "../table/Table";
import characterHeader from "./CharacterHeader";

const CharacterView = () => {
  const { data, loading, error } = useQuery(GET_ALL_CHARACTERS);
  const columns = useMemo(() => characterHeader(), []);

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
      <Heading textAlign="center" data-testid="characterInformationPage">
        Character Information Page
      </Heading>
      <Table data={data.characters.results} columns={columns} />;
    </>
  );
};

export default CharacterView;
