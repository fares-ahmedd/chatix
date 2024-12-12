import styled from "styled-components";
import LazyLoadingLogo from "../../ui/LazyLoadingLogo";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AppDataContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background-color: var(--background);
`;

const H4 = styled.h4`
  color: var(--text-color-500);
`;

function WelcomeToChatix() {
  const { dispatch, isOpen } = useAuth();

  function handleIsOpen() {
    dispatch({ type: "isOpen/toggle" });
  }
  return (
    <Container>
      <LazyLoadingLogo isAuto={false} />
      <h3>Welcome to Chatix</h3>
      <H4>Chat with people from around the world.</H4>
      <Button
        style={{ padding: "10px 30px", width: "fit-content" }}
        onClick={handleIsOpen}
      >
        {isOpen ? "Close" : "Open"}
      </Button>
    </Container>
  );
}

export default WelcomeToChatix;
