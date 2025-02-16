import styled from "styled-components";

export const Content = styled.main`
    height: calc(100vh - 60px);

    display: flex;
    justify-content: center;
`;

export const Contacts = styled.section`
    width: 700px;
    height: 100%;

    gap: .575rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    padding: .575rem;

    h1 {
        font: var(--poppins-32);
    }

    p {
        font: var(--poppins-16);
    }

    span {
        width: 80%;

        border: 1px solid #ebe8e8;
    }
`;

export const Table = styled.table`
    width: 100%;

    tr > td > button {
        border: none;
        border-radius: 4px;

        padding: .425rem;
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

    tr > td > button > a {
        font: var(--poppins-12);
        color: var(--color-0)
    }
`;