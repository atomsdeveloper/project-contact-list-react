import styled from "styled-components";

export const Header = styled.div`
    width: 100%;
    height: 60px;

    padding: 0rem 1.275rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: var(--color-11);
`;

export const Title = styled.div`
    width: 100px;

    a {
        color: var(--color-0);
        font: var(--poppins-18);
        
        &:hover {
            color: var(--color-6);
        }
    }
`;

export const Nav = styled.nav`
    flex: 1;

    ul {
        width: 100%;
        
        gap: .875rem;
        display: flex;
        justify-content: end;
    }

    ul > li > a {
        color: var(--color-0);
        font: var(--poppins-16);

        &:hover {
            color: var(--color-6);
        }
    }
`;