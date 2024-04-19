import styled from "styled-components";
import Chat from "../features/Chat";
import Header from "../features/Header";
import Sidebar from "../features/sidebar/Sidebar";
import { useAuth } from "../context/AuthContext";
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
  console.log(currentUser);
  console.log("rendering");

  return (
    <Main className={!isOpen ? "active" : ""}>
      <Header selectedUser={selectedUser} />
      <Sidebar setSelectedUser={setSelectedUser} />
      <Chat />
    </Main>
  );
}

export default Home;
