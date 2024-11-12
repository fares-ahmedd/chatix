import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import styled from "styled-components";
import { useAuth } from "../../context/AppDataContext";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import sendMessage from "../../services/sendMessage";
import Emojis from "../../ui/Emojis";
import { emojisArray } from "../../utils/emojisArray";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  background-color: var(--background);
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
  position: relative;
`;

const Main = styled.main`
  padding: 10px 20px;
`;

const InputFile = styled.input`
  display: none;
`;

const StyledButton = styled.button`
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--input-color-500);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InputMessage = styled.input`
  background-color: var(--global-background);
  color: var(--input-color-500);
  border: 1px solid var(--text-color-900);
  flex: 1;
  border-radius: 5px;
  padding: 5px 10px;
  &::placeholder {
    font-size: 14px;
  }
`;
const ButtonsGroup = styled.section`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 7px;
`;
const Emoji = styled.span`
  font-size: 25px;
  cursor: pointer;
`;

const StyledUploadImage = styled.button`
  font-size: 13px;
  color: var(--input-color-500);
  position: absolute;
  top: -50px;
  text-align: center;
  width: 120px;
  background-color: var(--global-background-500);
  border-radius: 10px;
  padding: 5px;
`;

function Chat() {
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const [image, setImage] = useState(null);
  const formRef = useRef(null);
  const InputRef = useRef(null);
  const { idRef, currentUser } = useAuth();
  const combinedId = idRef.current;

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [combinedId, setMessages]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.focus();
    }
  }, []);
  async function handleSend(e) {
    e.preventDefault();
    if (text.trim() === "" && !image) return;
    try {
      await sendMessage({ image, idRef, currentUser, text });
    } catch (error) {
      console.log(error.message);
    } finally {
      setText("");
      setImage(null);
      InputRef.current.focus();
    }
  }

  function handleSelectEmoji(emj) {
    setText((prev) => (prev += emj.emoji));
    if (InputRef.current) InputRef.current.focus();
  }
  return (
    <Section>
      <Main>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </Main>

      <Form ref={formRef} onSubmit={handleSend}>
        <Label htmlFor="send-image">
          <InputFile
            type="file"
            id="send-image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <FaImage />
          {image && <StyledUploadImage>Change image</StyledUploadImage>}
        </Label>
        <InputMessage
          type="text"
          placeholder="type a message here"
          onChange={(e) => setText(e.target.value)}
          value={text}
          ref={InputRef}
        />
        <ButtonsGroup>
          <StyledButton
            disabled={text.trim() === "" && !image}
            aria-label="send"
            title="send"
          >
            <IoSendSharp />
          </StyledButton>
          <Emojis>
            <Emojis.Toggle id={"emoji"} aria-label={"emojis"} title="emojis" />
            <Emojis.List id={"emoji"}>
              {emojisArray.map((emj) => (
                <Emoji
                  key={emj.title}
                  title={emj.title}
                  role="button"
                  onClick={() => handleSelectEmoji(emj)}
                >
                  {emj.emoji}
                </Emoji>
              ))}
            </Emojis.List>
          </Emojis>
        </ButtonsGroup>
      </Form>
    </Section>
  );
}

export default Chat;
