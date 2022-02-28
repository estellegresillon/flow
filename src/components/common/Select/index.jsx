import styled from "styled-components";

const Select = ({ name, onChange, options, placeholder, value }) => (
  <SelectWrapper>
    <select onChange={onChange} name={name} id={name} value={value}>
      <option value="">{placeholder}</option>
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </SelectWrapper>
);

export default Select;

const SelectWrapper = styled.div`
  select {
    border: none;
    box-shadow: 0 1px 30px 0 rgb(69 129 192 / 20%);
    color: #30305a;
    font-family: "Gilroy";
    padding: 10px;
    outline: 0;
  }

  select::-ms-expand {
    position: absolute;
  }
`;
