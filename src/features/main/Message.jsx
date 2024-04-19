import styled from "styled-components";
import UserImage from "../../assets/my-img.png";
import { useAuth } from "../../context/AppDataContext";

const Img = styled.img`
  width: 40px;
  border-radius: 50%;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
`;
const Time = styled.span`
  font-size: 13px;
  color: var(--text-color-900);
`;
const MessageStyled = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  &.owner {
    direction: rtl;
  }
`;
const Article = styled.article`
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
  margin-bottom: 18px;
  background-color: var(--global-background-500);
  position: relative;
  &::before {
    content: "";
    position: absolute;
    border: 12px solid;
    border-color: transparent transparent var(--global-background-500)
      transparent;
    top: -24px;
  }
`;

function Message({ message }) {
  const { currentUser, selectedUser } = useAuth();
  console.log(selectedUser);
  return (
    <MessageStyled className={message.senderId === currentUser.uid && "owner"}>
      <Section>
        <Img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : selectedUser.current.photoURL
          }
          alt="Message Logo"
        />
        <Time>just now</Time>
      </Section>
      <Article>
        {/* <Article className={isOwner ? "owner" : ""}> */}
        <p>
          Hey How are you! ewqewqewqewqewqewqlenwqjkenwkqnewoqoe moqw meioq wme
          owqmioeqw
        </p>
        <img
          src={
            "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
          }
          alt="sendImage"
          style={{ maxWidth: "80%", borderRadius: "10px" }}
        />
      </Article>
    </MessageStyled>
  );
}

export default Message;