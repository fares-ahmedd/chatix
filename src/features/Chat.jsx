import styled from "styled-components";
import { FaImage } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import Message from "./Message";

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
const Button = styled.button`
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

function Chat() {
  return (
    <Section>
      <Main>
        <Message />
        <Message isOwner={true} />
      </Main>
      <Form>
        <Label htmlFor="send-image">
          <InputFile type="file" id="send-image" />
          <FaImage />
        </Label>
        <InputMessage type="text" placeholder="Type a message here" />
        <Button>
          <IoSendSharp />
        </Button>
      </Form>
    </Section>
  );
}

export default Chat;
