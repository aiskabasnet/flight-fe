import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components";

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export { Layout };

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
