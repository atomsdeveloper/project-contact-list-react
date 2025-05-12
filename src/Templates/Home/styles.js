import styled from "styled-components";

export const ContainerHome = styled.div`
  width: 100%;

  display: flex;
`;

export const ContainerTable = styled.section`
  margin: 0 auto;

  margin-top: 2rem;
  overflow-x: auto;
  border-radius: 8px;

  background-color: #eee;
`;

export const Table = styled.table`
  min-width: 750px;
  border-collapse: collapse;

  th {
    text-align: center;
  }

  th,
  td {
    border-bottom: 1px solid #000;
    padding: 0.725rem;
  }

  tbody > tr > td > button {
    border: none;
  }

  tr > td > #edit {
    background: var(--color-p5);

    &:hover {
      background: var(--color-p6);
    }
  }

  tr > td > #delete {
    background: var(--color-13);

    &:hover {
      background: var(--color-12);
    }
  }

  tbody > tr > td > button > a {
    font: var(--poppins-12);
    color: var(--color-0);
    padding: 0px 15px;
  }
`;
