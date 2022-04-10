import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Center,
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

import GET_LOCATION_BY_ID from "../../graphql/queries/getLocationByID";
import ErrorAlert from "../errorAlert/ErrorAlert";
import Loading from "../loading/Loading";

const LocationPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_LOCATION_BY_ID, {
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
      <Box
        w={"full"}
        h="full"
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Center pt={6}>
          <Box w={"full"} bg="white" rounded={"md"}>
            <Stack textAlign={"center"} p={6} color="gray.800" align={"center"}>
              <Stack>
                <Text display="block" fontSize={"6xl"} fontWeight={800}>
                  {data.locationsByIds[0].name}
                </Text>
                <Text color={"gray.500"}>
                  {data.locationsByIds[0].dimension}
                </Text>
              </Stack>
            </Stack>

            <Box bg="gray.50" px={6} py={4}>
              <Text color="blue.500" fontWeight="bold">
                Residents of Location
              </Text>
              <Box pt={8}>
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Character Name</Th>
                        <Th>Link to Character</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.locationsByIds[0].residents.map(
                        (character: any) => (
                          <Tr key={character.id}>
                            <Td color="blackAlpha.900">{character.name}</Td>
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
                        )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </Center>
      </Box>
      <Outlet />
    </>
  );
};

export default LocationPage;
