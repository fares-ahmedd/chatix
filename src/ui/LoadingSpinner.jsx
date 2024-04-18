import styled, { keyframes } from "styled-components";

const BackgroundStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
`;

const loaderAnimation = keyframes`
  0% {
    transform: scaleY(0.1);
    background: transparent;
  }
  50% {
    transform: scaleY(1);
    background: #3498db;
  }
  100% {
    transform: scaleY(0.1);
    background: transparent;
  }
`;

const Bar = styled.div`
  width: 10px;
  height: 70px;
  display: inline-block;
  transform-origin: bottom center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: 5px 10px 20px inset rgba(52, 152, 219, 0.8);
  animation: ${loaderAnimation} 1.2s linear infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const Loader = () => {
  return (
    <div>
      <BackgroundStyled>
        <Bar delay={0.1} />
        <Bar delay={0.2} />
        <Bar delay={0.3} />
        <Bar delay={0.4} />
        <Bar delay={0.5} />
        <Bar delay={0.6} />
        <Bar delay={0.7} />
        <Bar delay={0.8} />
      </BackgroundStyled>
    </div>
  );
};

export default Loader;
