import styled from "styled-components";
import { useAuth } from "../../context/AppDataContext";
import Logo from "../../assets/logo.svg";
import Button from "../../ui/Button";
import Chat from "./Chat";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background-color: var(--background);
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
`;
const H4 = styled.h4`
  color: var(--text-color-500);
`;

function WelcomeScreen() {
  const { isSelected, dispatch } = useAuth();
  function handleIsOpen() {
    dispatch({ type: "isOpen/toggle" });
  }
  return isSelected ? (
    <Chat />
  ) : (
    <Container>
      <Img src={Logo} alt="LOGO" />
      <h3>Welcome to Chatix</h3>
      <H4>Chat with people from around the world.</H4>
      <Button style={{ padding: "10px" }} onClick={handleIsOpen}>
        Find users
      </Button>
    </Container>
  );
}

export default WelcomeScreen;
