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
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
`;

function WelcomeScreen() {
  const { isSelected, setIsOpen } = useAuth();

  return isSelected ? (
    <Chat />
  ) : (
    <Container>
      <Img src={Logo} alt="LOGO" />
      <h3>Welcome to Chatix</h3>
      <h4>Chat with people from around the world.</h4>
      <Button
        style={{ padding: "10px" }}
        onClick={() => setIsOpen((value) => !value)}
      >
        Find users
      </Button>
    </Container>
  );
}

export default WelcomeScreen;
