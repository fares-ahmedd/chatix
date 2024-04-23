import styled from "styled-components";
import LazyLoadingLogo from "./LazyLoadingLogo";
const MainElement = styled.main`
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--global-background);
`;
const Section = styled.section`
  padding: 15px;
  background-color: var(--background);
  border-radius: 10px;
  width: 60%;
  overflow: auto;
  box-shadow: var(--border-color) 0px 1px 2px 0px,
    var(--border-color) 0px 1px 3px 1px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const P = styled.p`
  color: var(--text-color-900);
  text-align: center;
  margin-bottom: 25px;
`;
const H2 = styled.h2`
  text-align: center;
`;

function Main({ children, title }) {
  return (
    <MainElement>
      <Section>
        <LazyLoadingLogo />
        <H2>Welcome To Chatix</H2>
        <P>{title}</P>
        {children}
      </Section>
    </MainElement>
  );
}

export default Main;
