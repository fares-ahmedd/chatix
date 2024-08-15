import styled, { keyframes } from "styled-components";
import UnKnownImage from "../../assets/unknownUser.jpg";
import { useAuth } from "../../context/AppDataContext";
import { formatTime, getTime } from "../../utils/helpers";
import LazyLoadingLogo from "../../ui/LazyLoadingLogo";

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;
const Time = styled.span`
  font-size: 13px;
  color: var(--text-color-900);
  margin-top: 3px;
`;
const MessageStyled = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  &.owner {
    direction: rtl;
  }
  &.owner article {
    background-color: var(--background-sender-message);
    color: white;
  }
  &.owner article::before {
    border-color: transparent transparent var(--background-sender-message)
      transparent;
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
const StyleSendImg = styled.img`
  width: 100%;
  height: 100%;
  z-index: 999;
`;
const bounceAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Loading = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  user-select: none;
  transform: translate(-50%, -50%);
  animation: ${bounceAnimation} 700ms infinite;
`;
const ContentMessage = styled.p`
  direction: ltr;
`;
const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 400px;
  width: 400px;
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  margin: 4px 0;
  display: flex;
  align-items: center;
`;

function Message({ message }) {
  const { currentUser, selectedUser } = useAuth();

  const time = getTime(message.date.seconds, message.date.nanoseconds);

  return (
    <MessageStyled className={message.senderId === currentUser.uid && "owner"}>
      <Section>
        <LazyLoadingLogo
          isSrc={
            message.senderId === currentUser.uid
              ? currentUser.photoURL || UnKnownImage
              : selectedUser.current.photoURL || UnKnownImage
          }
          dimensions="50px"
        />
        <Time>{formatTime(time)}</Time>
      </Section>
      <Article>
        <ContentMessage>{message.text}</ContentMessage>
        {message.image && (
          <ImageContainer>
            <Loading>Loading Image</Loading>
            <StyleSendImg src={message.image} alt="sendImage" loading="lazy" />
          </ImageContainer>
        )}
      </Article>
    </MessageStyled>
  );
}

export default Message;
