import styled from "styled-components";
import { theme } from "../../../utils";
import { Logo } from "../../atoms";

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
    </HeaderWrapper>
  );
};

export { Header };

const HeaderWrapper = styled.header`
  padding: 1rem;
  border-bottom: 1px solid ${theme.border};
`;
