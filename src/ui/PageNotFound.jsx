import React from "react";
import styled from "styled-components";
import pageNotFound from "../assets/notFound.svg";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 1rem;
  height: 100vh;
  background-color: var(--background);
`;

const Image = styled.img`
  max-width: 300px;
  width: 100%;
  margin-bottom: 2rem;
  aspect-ratio: 1/1; // Or whatever matches your image's aspect ratio
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 2rem;

  text-align: center;
`;

function NotFoundPage() {
  const navigate = useNavigate("");
  return (
    <Container>
      <Image src={pageNotFound} alt="404 Not Found" draggable={false} />
      <Title>Oops! Page Not Found</Title>
      <Description>
        The page you're looking for doesn't exist or has been moved.
      </Description>
      <Link
        onClick={() => {
          navigate("/");
        }}
        style={{
          color: "inherit",
          textTransform: "uppercase",
          textDecoration: "underline",
        }}
      >
        Go Back Home
      </Link>{" "}
    </Container>
  );
}

export default NotFoundPage;
