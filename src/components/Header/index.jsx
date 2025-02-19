// Syled Components
import * as S from "./styles";

// Router
import { Link } from "react-router-dom";

// Context
import { useAuthContext } from "../_context/authContext";

// Libs
import Swal from "sweetalert2";

export const Header = () => {
  const { hasUser, setHasUser } = useAuthContext();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/logout", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        title: "Aviso!",
        text: `${data.message}`,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#111111d9",
      }).then(() => {
        sessionStorage.removeItem("user");
        setHasUser(null);
        window.location.reload(); // Recarrega a página após o logout
      });
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
            <Link to="/contato">Cadastrar contato</Link>
          </li>
          <li>
            <Link to="/register">Criar conta</Link>
          </li>
          {!hasUser ? (
            <li>
              <Link to="/login">Entrar</Link>
            </li>
          ) : (
            <li>
              <Link to="/" onClick={handleLogout}>
                Sair
              </Link>
            </li>
          )}
        </ul>
      </S.Nav>
    </S.Header>
  );
};
