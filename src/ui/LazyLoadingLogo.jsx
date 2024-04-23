import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Logo from "../assets/logo-big.png";

const BlurLoadContainer = styled.div`
  width: ${(props) => props.id};
  height: ${(props) => props.id};
  background-image: url("logo-small.png");
  background-position: center;
  background-size: cover;
  margin: ${(props) => (props.className.includes("true") ? `auto` : `0px`)};

  ${(props) =>
    props.className?.includes("loaded") &&
    css`
      background: transparent;
    `}
  ${(props) =>
    props.className?.includes("avatar") &&
    css`
      border-radius: 50%;
    `}
`;

const Image = styled.img`
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  width: ${(props) => props.id};
  height: ${(props) => props.id};

  ${(props) =>
    props.className?.includes("loaded") &&
    css`
      opacity: 1;
    `}
  ${(props) =>
    props.className?.includes("avatar") &&
    css`
      border-radius: 50%;
    `}
`;

function LazyLoadingLogo({
  isAuto = true,
  dimensions = "200px",
  isSrc = null,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <BlurLoadContainer
      className={`${isLoaded ? "loaded" : ""} ${isAuto ? "true" : "false"} ${
        isSrc !== null ? "avatar" : ""
      } `}
      id={dimensions}
    >
      <Image
        ref={imgRef}
        src={isSrc !== null ? isSrc : Logo}
        alt={isSrc !== null ? "Avatar" : "Logo"}
        onLoad={handleImageLoad}
        className={`${isLoaded ? "loaded" : ""}  ${
          isSrc !== null ? "avatar" : ""
        }`}
        id={dimensions}
      />
    </BlurLoadContainer>
  );
}

export default LazyLoadingLogo;
