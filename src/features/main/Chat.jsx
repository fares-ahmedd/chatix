import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import styled from "styled-components";
import { useAuth } from "../../context/AppDataContext";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

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

function Chat() {
  const { messages, setMessages } = useState([]);
  const formRef = useRef(null);

  const { isOpen, idRef } = useAuth();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ block: "end" });
    }
  }, [isOpen]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", idRef.current), (doc) => {
      doc.exists() && setMessages(doc.data());
    });

    return () => {
      unSub();
    };
  }, [idRef, setMessages]);
  return (
    <Section>
      <Main>
        {messages.map((message) => (
          <Message message={message} />
        ))}
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
  );
}

export default Chat;
