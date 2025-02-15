import { Link } from "react-router-dom";

// Types
import P from "prop-types";

// Styles
import * as S from "./styles";

export const NotFound = ({ text }) => {
    return (
        <S.MainContainer>
            <S.Container>
                <S.Title> Error: 404 <span>.</span> </S.Title>
                <p>{text}</p>
                <Link to="/">Back to Home</Link>
            </S.Container>
        </S.MainContainer>
    )
}
NotFound.propTypes = {
    text: P.string,
}