import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

interface ErrorAlertProps {
  title: string;
  description: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, description }) => (
  <Alert status="error" data-testid="ErrorAlert">
    <AlertIcon />
    <AlertTitle mr={2}>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
    <CloseButton position="absolute" right="8px" top="8px" />
  </Alert>
);
export default ErrorAlert;
