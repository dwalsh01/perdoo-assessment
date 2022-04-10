import { Box } from "@chakra-ui/react";
import BrowserRoutes from "./routes/Routes";
import Navigation from "./components/navigation/Navbar";

export const App = () => {
  return (
    <Box w="100%" h="100%" textColor="gray.50">
      <Navigation />
      <Box px={10}>
        <BrowserRoutes />
      </Box>
    </Box>
  );
};
