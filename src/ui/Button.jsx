import styled from "styled-components";

const Button = styled.button`
  padding: 12px 50px;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  text-transform: uppercase;
  color: var(--color-brand-50);
  background-image: linear-gradient(
    to bottom right,
    var(--color-brand-900),
    var(--color-brand-300)
  );
  border: none;
  border-radius: 40px;
  box-shadow: 0px 4px 0px var(--color-brand-300);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 0px var(--color-brand-300);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: none;
    background-image: linear-gradient(
      to bottom right,
      var(--color-brand-300),
      #00c6ff
    );
  }

  &:focus {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: translateY(0);
    box-shadow: none;
    background-image: gray;
    color: var(--color-brand-100);

    @media (prefers-color-scheme: dark) {
      background-image: linear-gradient(
        to bottom right,
        var(--color-brand-700),
        var(--color-brand-900)
      );
      color: var(--color-brand-300);
    }
  }
`;

export default Button;
