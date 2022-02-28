import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import IconClose from "components/common/IconClose";
import Input from "components/common/Input";

const SmallModal = ({ name, onValidate, onClose }) => {
  const [value, setValue] = useState("");

  const onClick = useCallback(() => {
    if (!value) {
      return;
    }

    onValidate(value);
    setValue("");
    onClose();
  }, [onClose, onValidate, value]);

  const handleKeyDown = useCallback(
    (e) => {
      const key = e.key;

      if (key === "Enter") {
        onClick();
      }
    },
    [onClick]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <SmallModalWrapper>
      <CloseButton onClick={onClose}>
        <IconClose />
      </CloseButton>
      <Input
        name={name}
        onChange={(event) => setValue(event.target.value)}
        placeholder={`Enter a name for your ${name}`}
        value={value}
      />
      <CreateButton onClick={onClick}>Create</CreateButton>
    </SmallModalWrapper>
  );
};

export default SmallModal;

const SmallModalWrapper = styled.div`
  align-items: flex-start;
  background-color: white;
  border-radius: 15px;
  bottom: 10px;
  box-shadow: 0 1px 60px 0 rgb(69 129 192 / 15%);
  display: flex;
  flex-direction: column;
  left: 85px;
  position: absolute;
  width: 250px;
  z-index: 10;

  svg {
    color: #365ed2;
    height: 10px;
    width: 10px;
    margin: 5px;

    &:hover {
      color: #092578;
    }
  }
`;

const CloseButton = styled.div`
  border-radius: 10px;
  margin: 10px;
  text-align: center;
`;

const CreateButton = styled.div`
  border-radius: 10px;
  color: white;
  font-family: Gilroy;
  margin: 10px;
  padding: 10px 0;
  text-align: center;
  width: calc(100% - 20px);
  background-color: #365ed3;

  &:hover {
    background-color: #092578;
  }
`;
