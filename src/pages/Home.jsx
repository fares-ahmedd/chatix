import styled from "styled-components";
import Chat from "../features/Chat";
import Header from "../features/Header";
import Sidebar from "../features/Sidebar";

const Main = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

function Home() {
  return (
    <Main>
      <Header />
      <Sidebar />
      <Chat />
    </Main>
  );
}

export default Home;
