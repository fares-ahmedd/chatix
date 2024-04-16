import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  padding: 12px 50px;
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
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
`;

export default Button;
