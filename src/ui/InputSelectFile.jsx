import styled from "styled-components";
import { FaImage } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

const StyledInput = styled.div`
  margin: 15px auto;
  width: 100%;
  padding: 0 10px;
  border: 1px solid var(--text-color-700);
  border-radius: 10px;
  position: relative;
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
  cursor: pointer;
`;

function InputSelectFile({ onChange, file, pickedImage }) {
  return (
    <StyledInput>
      <Input
        type="file"
        id="file"
        accept=".jpg,.png,.jpeg"
        onChange={onChange}
      />
      <Container htmlFor="file">
        <Image>
          <FaImage />
        </Image>
        <span>
          {file ? (
            <>
              Change Your Image <FaExchangeAlt />
            </>
          ) : (
            " Select Your Image"
          )}
        </span>
      </Container>
    </StyledInput>
  );
}

export default InputSelectFile;
