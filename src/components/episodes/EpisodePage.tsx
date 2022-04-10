import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import GET_EPISODE_BY_ID from "../../graphql/queries/getEpisodesByID";
import ErrorAlert from "../errorAlert/ErrorAlert";
import Loading from "../loading/Loading";

const EpisodePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EPISODE_BY_ID, {
    variables: { id },
  });
  if (loading) {
    return <Loading />;
  }

  if (error && !data) {
    return (
      <ErrorAlert
        title="Error fetching data"
        description="Please try again later"
      />
    );
  }

  return (
    <>
      <Center>
        <Box
          w={"full"}
          bg="white"
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {data.episodesByIds[0].episode} - {data.episodesByIds[0].air_date}
            </Text>
            <Heading
              color="blackAlpha.900"
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {data.episodesByIds[0].name}
            </Heading>
          </Stack>
          <Box pt={8} mx={10}>
            <Heading color="black">Characters In Episode</Heading>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th>Gender</Th>
                    <Th>Species</Th>
                    <Th>Origin</Th>
                    <Th>Location</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.episodesByIds[0].characters.map((character: any) => (
                    <Tr key={character.id} color="blackAlpha.900">
                      <Td>
                        <Avatar
                          size={"md"}
                          src={character.image}
                          css={{
                            border: "2px solid white",
                          }}
                        />
                      </Td>
                      <Td>{character.name}</Td>
                      <Td>{character.gender}</Td>
                      <Td>{character.species}</Td>
                      <Td>{character.origin.name}</Td>
                      <Td>{character.location.name}</Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          onClick={() =>
                            navigate(`/characters/${character.id}`, {
                              replace: true,
                            })
                          }
                        >
                          View Character
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Center>
      <Outlet />
    </>
  );
};

export default EpisodePage;
