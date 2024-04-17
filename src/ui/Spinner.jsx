import styled, { keyframes } from "styled-components";

const spinnerFade = keyframes`
  0% {
    background-color: white;
  }
  100% {
    background-color: transparent;
  }
`;

const SpinnerContainer = styled.div`
  font-size: 25px;
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

const SpinnerBlade = styled.div`
  position: absolute;
  left: 0.4629em;
  bottom: 0;
  width: 0.074em;
  height: 0.2777em;
  border-radius: 0.0555em;
  background-color: transparent;
  transform-origin: center -0.2222em;
  animation: ${spinnerFade} 1s infinite linear;

  &:nth-child(1) {
    animation-delay: 0s;
    transform: rotate(0deg);
  }
  &:nth-child(2) {
    animation-delay: 0.083s;
    transform: rotate(30deg);
  }
  &:nth-child(3) {
    animation-delay: 0.166s;
    transform: rotate(60deg);
  }
  &:nth-child(4) {
    animation-delay: 0.249s;
    transform: rotate(90deg);
  }
  &:nth-child(5) {
    animation-delay: 0.332s;
    transform: rotate(120deg);
  }
  &:nth-child(6) {
    animation-delay: 0.415s;
    transform: rotate(150deg);
  }
  &:nth-child(7) {
    animation-delay: 0.498s;
    transform: rotate(180deg);
  }
  &:nth-child(8) {
    animation-delay: 0.581s;
    transform: rotate(210deg);
  }
  &:nth-child(9) {
    animation-delay: 0.664s;
    transform: rotate(240deg);
  }
  &:nth-child(10) {
    animation-delay: 0.747s;
    transform: rotate(270deg);
  }
  &:nth-child(11) {
    animation-delay: 0.83s;
    transform: rotate(300deg);
  }
  &:nth-child(12) {
    animation-delay: 0.913s;
    transform: rotate(330deg);
  }
`;

const Spinner = () => {
  return (
    <SpinnerContainer className="center">
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
    </SpinnerContainer>
  );
};

export default Spinner;
