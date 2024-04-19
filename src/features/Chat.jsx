import styled from "styled-components";
import { FaImage } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.svg";
import Button from "../ui/Button";
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
`;

const Form = styled.form`
  background-color: var(--global-background-500);
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
`;

const Main = styled.main`
  padding: 10px 20px;
`;

const InputFile = styled.input`
  display: none;
`;

const StyledButton = styled.button`
  border: none;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputMessage = styled.input`
  flex: 1;
  padding: 0 10px;
  &::placeholder {
    font-size: 14px;
  }
`;
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

function Chat() {
  const { isSelected, isOpen, setIsOpen } = useAuth();
  const formRef = useRef(null);
  useEffect(() => {
    const form = formRef.current;
    if (form) {
      form.scrollIntoView({ block: "end" });
    }
  }, [isOpen]);

  return isSelected ? (
    <Section>
      <Main>
        <Message />
        <Message isOwner={true} />
      </Main>
      <Form ref={formRef}>
        <Label htmlFor="send-image">
          <InputFile type="file" id="send-image" />
          <FaImage />
        </Label>
        <InputMessage type="text" placeholder="Type a message here" />
        <StyledButton>
          <IoSendSharp />
        </StyledButton>
      </Form>
    </Section>
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

export default Chat;
