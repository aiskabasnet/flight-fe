import { Button as MUIButton } from "@mui/material";
import styled from "styled-components";
import { theme } from "../../../utils";

interface IProps {
  children: React.ReactNode;
}

const Button = ({ children }: IProps) => {
  return (
    <ButtonWrapper className="shadow-md" type="submit" variant="contained">
      {children}
    </ButtonWrapper>
  );
};

export { Button };

const ButtonWrapper = styled(MUIButton)`
  background-color: ${theme.primary};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.2s;
  border-radius: 30px;

  &:hover {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.2s;
    transform: scale(1.05);
  }
`;
