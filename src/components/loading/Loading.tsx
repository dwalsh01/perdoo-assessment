import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading: React.FC = ({}) => {
  return (
    <Box textAlign="center" mt={10} data-testid="LoadingSpinner">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default Loading;
