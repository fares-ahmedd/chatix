import styled from "styled-components";
import WelcomeScreen from "../features/main/WelcomeScreen";
import Header from "../features/header/Header";
import Sidebar from "../features/sidebar/Sidebar";
import { useAuth } from "../context/AppDataContext";
import { useState } from "react";

const Main = styled.main`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
  &.active {
    grid-template-columns: 1fr;
  }
`;

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser, isOpen } = useAuth();
  console.log(selectedUser);

  return (
    <Main className={!isOpen ? "active" : ""}>
      <Header selectedUser={selectedUser} />
      <Sidebar setSelectedUser={setSelectedUser} />
      <WelcomeScreen />
    </Main>
  );
}

export default Home;
