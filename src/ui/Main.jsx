import styled from "styled-components";
import LazyLoadingLogo from "./LazyLoadingLogo";
const MainElement = styled.main`
  min-height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--global-background);
  padding: 10px 0;
`;
const Section = styled.section`
  padding: 15px;
  background-color: var(--background);

  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  overflow: auto;
  @media (max-width: 768px) {
    width: 90%;
  }
  box-shadow: var(--border-color) 0px 1px 2px 0px,
    var(--border-color) 0px 1px 3px 1px;
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
        <LazyLoadingLogo dimensions="120px" />
        <H2>Welcome To Chatix</H2>
        <P>{title}</P>
        {children}
      </Section>
    </MainElement>
  );
}

export default Main;
