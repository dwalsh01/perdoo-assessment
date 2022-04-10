import { useLazyQuery, useQuery } from "@apollo/client";
import GET_ALL_CHARACTERS from "../../graphql/queries/getAllCharacters";
import Table from "../table/Table";

import { useMemo } from "react";
import episodeHeader from "./EpisodeHeader";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import ErrorAlert from "../errorAlert/ErrorAlert";
import GET_ALL_EPISODES from "../../graphql/queries/getAllEpisodes";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const EpisodeView = () => {
  const { data, loading, error } = useQuery(GET_ALL_EPISODES);
  const navigate = useNavigate();
  const columns = useMemo(() => episodeHeader(navigate), []);

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
      <Heading textAlign="center" data-testid="episodes-heading">
        Episodes Information
      </Heading>
      <Table data={data.episodes.results} columns={columns} />
    </>
  );
};

export default EpisodeView;
