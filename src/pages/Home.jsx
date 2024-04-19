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
`;

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <Main>
      <Header selectedUser={selectedUser} />
      <Sidebar setSelectedUser={setSelectedUser} />
      <Chat />
    </Main>
  );
}

export default Home;
