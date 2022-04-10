import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
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

import GET_CHARACTER_BY_ID from "../../graphql/queries/getCharacterByID";
import ErrorAlert from "../errorAlert/ErrorAlert";
import Loading from "../loading/Loading";

const CharacterPage: React.FC = ({}) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });
  if (loading) {
    return <Loading />;
  }

  if (error && !data) {
    return (
      <ErrorAlert
        title="Error Fetching Data"
        description="Please try again later."
      />
    );
  }
  return (
    <>
      <Box
        w={"full"}
        h="full"
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box h={"120px"} w={"full"} bg="blue.100" />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={data.character.image}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {data.character.name}
            </Heading>
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={
                data.character.status === "Alive" ? "green.100" : "yellow.100"
              }
              p={2}
              px={3}
              color="blackAlpha.900"
              rounded={"full"}
            >
              {data.character.status}
            </Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{data.character.gender}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Gender
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{data.character.species}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Species
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{data.character.origin.name}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Origin
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{data.character.location.name}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Location
              </Text>
            </Stack>
          </Stack>

          <Box pt={8} mx={10}>
            <Heading>Appears In:</Heading>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Episode Number</Th>
                    <Th>Episode Name</Th>
                    <Th>Air Date</Th>
                    <Th>Link to Episode</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.character.episode.map((episode: any) => (
                    <Tr key={episode.id}>
                      <Th>{episode.episode}</Th>
                      <Td>{episode.name}</Td>
                      <Td>{episode.air_date}</Td>

                      <Td>
                        <Button
                          colorScheme="blue"
                          onClick={() =>
                            navigate(`/episodes/${episode.id}`, {
                              replace: true,
                            })
                          }
                        >
                          Click to view episode
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      <Outlet />
    </>
  );
};

export default CharacterPage;
