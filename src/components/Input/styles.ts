import styled from "styled-components";

interface InputProps {
  error: boolean;
}

export const Container = styled.input<InputProps>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ error }) => (error ? "red" : "#333")};
  font-size: 1.5rem;
`;
