import React from "react";
import styled, { keyframes } from "styled-components";
import pageNotFound from "../assets/notFound.svg";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
const FadeIn = keyframes`
 0% {
   opacity: 0;
   transform: translateY(50px);
 }
 100% {
   opacity: 1;
   transform: translateY(0);
 }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  animation: ${FadeIn} 0.8s ease-in-out;
`;

const Image = styled.img`
  max-width: 300px;
  width: 100%;
  margin-bottom: 2rem;
  animation: ${FadeIn} 1s ease-in-out 0.2s;
  animation-fill-mode: both;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  animation: ${FadeIn} 1s ease-in-out 0.4s;
  animation-fill-mode: both;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  animation: ${FadeIn} 1s ease-in-out 0.6s;
  animation-fill-mode: both;
`;

function NotFoundPage() {
  const navigate = useNavigate("");
  return (
    <Container>
      <Image src={pageNotFound} alt="404 Not Found" />
      <Title>Oops! Page Not Found</Title>
      <Description>
        The page you're looking for doesn't exist or has been moved.
      </Description>
      <Button>
        <Link
          onClick={() => {
            navigate("/");
          }}
          style={{ color: "inherit" }}
        >
          Go Back Home
        </Link>{" "}
      </Button>
    </Container>
  );
}

export default NotFoundPage;
