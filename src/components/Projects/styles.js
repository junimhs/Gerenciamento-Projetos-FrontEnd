import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  overflow-y: scroll;

  > header {
    display: flex;
    background: #202225;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 20px;

    h1 {
      font-size: 20px;
    }

    div {
      button {
        margin-left: 10px;
      }
    }
  }
`;

export const Project = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 18px;
  }
`;

export const Excluir = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px dashed #ce3333;
  color: #ce3333;
  font-weight: bold;
  background: transparent;
  line-height: 20px;
  transition: all 0.2s;

  &:hover {
    border-color: #a52b2b;
    color: #a52b2b;
  }
`;
