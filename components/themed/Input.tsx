import { css } from "styled-components";
import styled from "styled-components/native";

const Input = styled.TextInput<{ $hidden?: boolean }>`
  font-size: 16px;
  line-height: 24px;
  padding: 8px 0;
  border-bottom-width: 2px;
  font-family: "SourceSans3";

  ${(props) => {
    if (props.$hidden) {
      return css`
        display: none;
      `;
    }
  }}
`;

export default Input;
