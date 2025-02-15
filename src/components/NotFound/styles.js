import styled, { keyframes } from "styled-components";

const slide = keyframes`
  	0% {
		transform: translateX(-1000px);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${slide} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  p {
    font: var(--poppins-16);
    color: var(--color-p11);
    margin-bottom: 1rem;
  }

  a {
    font: var(--poppins-18);
		color: var(--color-p11);
		&:hover {
			color: var(--color-10);
		}
  }
`;

export const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding-left: 1.25rem;
	padding-right: 1.25rem;
`;

export const Title = styled.h1`
	color: var(--color-p11);
	font: var(--poppins-64);
	margin-bottom: 0.5rem;

	span {
		color: var(--color-p10);
		font: var(--poppins-64);

		@media (max-width: 37.5rem) {
			font-size: 2.25rem;
		}
	}

	@media (max-width: 37.5rem) {
		font-size: 2.25rem;
		max-width: 20ch;
		margin: 0 auto;
		margin-bottom: 0.5rem;
	}
`;