import styled from "styled-components";

const Input = ({ name, onChange, placeholder, value }) => (
  <InputWrapper>
    <input
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      type="text"
    />
  </InputWrapper>
);

export default Input;

const InputWrapper = styled.div`
  width: 100%;

  input {
    background-color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0 1px 30px 0 rgb(69 129 192 / 20%);
    color: #30305a;
    font-family: "Gilroy";
    height: 35px;
    outline: 0;
    padding-left: 15px;
    width: calc(100% - 17px);

    &::placeholder {
      color: #30305a;
      opacity: 0.5;
    }
  }
`;
