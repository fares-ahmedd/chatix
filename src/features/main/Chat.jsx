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
  color: var(--input-color-500);
  background-color: transparent;

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
  align-items: center;
  gap: 7px;
`;
const Emoji = styled.span`
  font-size: 25px;
  cursor: pointer;
`;

const StyledUploadImage = styled.span`
  font-size: 13px;
  color: var(--input-color-500);
`;

function Chat() {
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const [image, setImage] = useState(null);
  const formRef = useRef(null);
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
    }
  }
  return (
    <Section>
      <Main>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </Main>
      <Form ref={formRef}>
        <Label htmlFor="send-image">
          <InputFile
            type="file"
            id="send-image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <FaImage />
          {image && <StyledUploadImage>Uploaded image</StyledUploadImage>}
        </Label>
        <InputMessage
          type="text"
          placeholder="type a message here"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <ButtonsGroup>
          <Emojis>
            <Emojis.Toggle id={"emoji"} />
            <Emojis.List id={"emoji"}>
              {emojisArray.map((emoji) => (
                <Emoji
                  key={emoji.title}
                  title={emoji.title}
                  role="button"
                  onClick={() => setText((prev) => (prev += emoji.emoji))}
                >
                  {emoji.emoji}
                </Emoji>
              ))}
            </Emojis.List>
          </Emojis>
          <StyledButton
            onClick={handleSend}
            disabled={text.trim() === "" && !image}
          >
            <IoSendSharp />
          </StyledButton>
        </ButtonsGroup>
      </Form>
    </Section>
  );
}

export default Chat;
