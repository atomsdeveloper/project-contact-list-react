// Syled Components
import * as S from "./styles";

// Router
import { Link } from "react-router-dom";

// Types
import P from "prop-types";
export const Header = ({ user }) => {
    return (
        <S.Header>
            <S.Title>
                <Link to="/">Agenda</Link>
            </S.Title>
            <S.Nav>
                <ul>
                    <li>
                        <Link to="/contato/index">
                            Cadastrar contato
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            Criar conta
                        </Link>
                    </li>
                    {!user ? (
                        <li>
                            <Link to="/login">
                                Entrar
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/logout">
                                Sair
                            </Link>
                        </li>
                    )}
                </ul>
            </S.Nav>
        </S.Header>
    );
};
Header.PropTypes = {
    user: P.shape({
        name: P.string.isRequired,
        email: P.string.isRequired
    }).isRequired
}