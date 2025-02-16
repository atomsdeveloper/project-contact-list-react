import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: calc(100vh - 60px);

    padding: .875rem;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Form = styled.div`
    width: 370px;
    height: 250px;

    h2 {
        font: var(--poppins-32);
    }

    form {
        width: 100%;
        height: 100%;

        gap: .875rem;
        display: flex;
        align-items: start;
        flex-direction: column;
        justify-content: center;

        .form-group {
            width: 100%;

            display: flex;
            flex-direction: column;

            label {
            
            }

            input {
                height: 40px;

                padding: .575rem;
                
                border: 1px solid var(--color-4);
                border-radius: 4px;

                &:focus {
                    outline: none;

                    border: 1px solid var(--color-p5);
                    transition: border .3s ease-in-out, box-shadow .3s ease-in-out;
                }

                &::placeholder {
                    font-family: "Poppins", sans-serif;
                    font-size: 15px;
                }
            }
        }

        button {
            width: 100px;
            height: 35px;

            font: var(--poppins-16);
            color: var(--color-0);
            
            border: none;
            border-radius: 4px;
            background: var(--color-p5);
        }
    }
`;