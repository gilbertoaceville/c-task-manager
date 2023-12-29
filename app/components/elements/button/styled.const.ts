import styled from "styled-components";

export const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1.2rem;
  border: none;
  color: ${(props) => props.theme.colorGrey0};
  z-index: 5;
  cursor: pointer;

  transition: all 0.55s ease-in-out;

  &[data-variant="primary"] {
    padding: 0.8rem 2rem;
    border-radius: 0.8rem;
    background: ${(props)=> props.theme.colorPrimary};
  }

  &[data-variant="secondary"] {
    padding: 0.4rem 0.8rem;
    border-radius: 0.8rem;
  }

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.5rem;
    transition: all 0.55s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey0};
    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
