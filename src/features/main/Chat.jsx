import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import styled from "styled-components";
import { useAuth } from "../../context/AppDataContext";
import Message from "./Message";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
`;

const InputMessage = styled.input`
  background-color: var(--global-background);
  color: var(--input-color-500);
  border: 1px solid var(--text-color-900);
  flex: 1;
  padding: 0 10px;
  &::placeholder {
    font-size: 14px;
  }
`;

const StyledUploadImage = styled.span`
  font-size: 13px;
  color: #075f07;
`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const formRef = useRef(null);
  const { currentUser } = useAuth();
  const { isOpen, idRef } = useAuth();
  const combinedId = idRef.current;
  useEffect(() => {
    const timer = setTimeout(() => {
      formRef.current.scrollIntoView({ block: "end" });
    }, 1000);
    return () => clearTimeout(timer);
  }, [isOpen]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [combinedId, setMessages]);
  async function handleSend(e) {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(db, "chats", idRef.current), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", idRef.current), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    setText("");
    setImage(null);
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
          placeholder="Type a message here"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <StyledButton onClick={handleSend}>
          <IoSendSharp />
        </StyledButton>
      </Form>
    </Section>
  );
}

export default Chat;
