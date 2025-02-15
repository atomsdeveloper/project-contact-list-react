import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /* Color and Font Variables */
	:root {
		--color-0: #ffffff;
		--color-1: #f7f7f7;
		--color-2: #ededed;
		--color-3: #dedede;
		--color-4: #cccccc;
		--color-5: #b2b2b2;
		--color-6: #9c9c9c;
		--color-7: #717171;
		--color-8: #595959;
		--color-9: #404040;
		--color-10: #2e2e2e;
		--color-11: #111111;
		--color-12: #000000;

		--color-p1: #f2e1ff;
		--color-p2: #ddc8ff;
		--color-p3: #c3aeff;
		--color-p4: #a78afb;
		--color-p5: #38BDF8;
		--color-p6: #5cb7df;
		--color-p7: #6fbadb;
		--color-p8: #7cc8e9;
		--color-p9: #8dcce7;
		--color-p10: #140f4b;
		--color-p11: #09062c;
		--gradient: linear-gradient(180deg, var(--color-p3) 0%, var(--color-p5) 100%);

		/* Desktop Font sizes */
		--poppins-12: 400 0.75rem/1.35 "Poppins", sans-serif;
		--poppins-16: 400 1rem/1.5 "Poppins", sans-serif;
		--poppins-18: 400 1.125rem/1.35 "Poppins", sans-serif;
		--poppins-24: 400 1.5rem/1.5 "Poppins", sans-serif;
		--poppins-32: 600 2rem/1.25 "Poppins", sans-serif;
	}

    /* Responsive Font Sizes */
	@media (max-width: 1080px) {
		html {
			font-size: 93.75%;
		}
	}

	@media (max-width: 720px) {
		html {
			font-size: 87.5%;
		}
	}

    	button, a {
		cursor: pointer;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	ul {
		list-style: none;
	}

	img {
		max-width: 100%;
		height: auto;
		display: block;
	}

	h1, h2, h3, h4, ul, p {
		margin: 0;
	}

    /* Resetting default styles */
    * {
    	margin: 0;
    	padding: 0;
    	box-sizing: border-box;
    }   
    *::after,
    *::before {
    	box-sizing: border-box;
    }

    body {
      font-family: "Poppins", sans-serif;
      -webkit-font-smoothing: antialiased;
      height: 100vh;
      width: 100vw;
      overflow-x: hidden;
      background-color: var(--color-0)
    }
`;