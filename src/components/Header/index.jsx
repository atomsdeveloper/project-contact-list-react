import React from "react";

// Syled Components
import * as S from "./styles";

// Router
import { Link } from "react-router-dom";
import { useAuthContext } from "../_context/authContext";

export const Header = () => {
    const { hasUser, setHasUser } = useAuthContext();

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/logout", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            sessionStorage.removeItem("user");
            sessionStorage.clear();
            setHasUser(null);
        }
    };

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
                    {!hasUser ? (
                        <li>
                            <Link to="/login">
                                Entrar
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link
                                to="/"
                                onClick={handleLogout}
                            >
                                Sair
                            </Link>
                        </li>
                    )}
                </ul>
            </S.Nav>
        </S.Header>
    );
};