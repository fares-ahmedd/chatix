import styled from "styled-components";
import Logo from "../assets/logo.svg";
const MainElement = styled.main`
  height: 100vh;
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

  @media (max-width: 768px) {
    width: 90%;
  }
`;
const Img = styled.img`
  width: 150px;
  display: block;
  margin: auto;
`;
const P = styled.p`
  color: var(--text-color-900);
  text-align: center;
  margin-bottom: 40px;
`;
const H2 = styled.h2`
  text-align: center;
`;

function Main({ children, title }) {
  return (
    <MainElement>
      <Section>
        <Img src={Logo} alt="Logo" />
        <H2>Welcome To Chatix</H2>
        <P>{title}</P>
        {children}
      </Section>
    </MainElement>
  );
}

export default Main;
