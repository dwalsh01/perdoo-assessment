import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigateButtonProps {
  id: string | number;
  to: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ id, to }) => {
  const navigate = useNavigate();
  return (
    <Button
      colorScheme="blue"
      data-testid={`viewMoreButton-${id}`}
      onClick={() =>
        navigate(`/${to}/${id}`, {
          replace: true,
        })
      }
    >
      View More
    </Button>
  );
};

export default NavigateButton;
