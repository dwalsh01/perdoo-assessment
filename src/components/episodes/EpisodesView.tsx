import { useQuery } from "@apollo/client";
import { Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import GET_ALL_EPISODES from "../../graphql/queries/getAllEpisodes";
import ErrorAlert from "../errorAlert/ErrorAlert";
import Loading from "../loading/Loading";
import Table from "../table/Table";
import episodeHeader from "./EpisodeHeader";

const EpisodeView = () => {
  const { data, loading, error } = useQuery(GET_ALL_EPISODES);
  const navigate = useNavigate();
  const columns = useMemo(() => episodeHeader(navigate), [navigate]);

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
