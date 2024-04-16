import styled from "styled-components";
import { FaImage } from "react-icons/fa";

const StyledInput = styled.div`
  margin: 15px auto;
  width: 70%;
  padding: 0 10px;
  border: 1px solid var(--text-color-700);
  border-radius: 10px;
`;

const Input = styled.input`
  display: none;
`;

const Image = styled.span`
  font-size: 30px;
  color: var(--color-brand-300);
  cursor: pointer;
  vertical-align: middle;
`;

const Container = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color-900);
`;

function InputSelectFile() {
  return (
    <StyledInput>
      <Input type="file" id="file" />
      <Container htmlFor="file">
        <Image>
          <FaImage />
        </Image>
        <span>Select an Image</span>
      </Container>
    </StyledInput>
  );
}

export default InputSelectFile;
