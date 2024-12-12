import styled from "styled-components";
import Content from "../features/main/Content";
import Header from "../features/header/Header";
import Sidebar from "../features/sidebar/Sidebar";
import { useAuth } from "../context/AppDataContext";
import { useState } from "react";

const Main = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
  &.active {
    grid-template-columns: 1fr;
  }
`;

function Home() {
  const [selectedUser, setSelectedUser] = useState(() => {
    const currentUser = localStorage.getItem("last-talk");

    return currentUser ? JSON.parse(currentUser) : null;
  });
  const { isOpen } = useAuth();

  return (
    <Main className={!isOpen ? "active" : ""}>
      <Header selectedUser={selectedUser} />
      <Sidebar setSelectedUser={setSelectedUser} />
      <Content />
    </Main>
  );
}

export default Home;
