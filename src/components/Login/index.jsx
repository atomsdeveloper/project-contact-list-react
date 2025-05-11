import React from "react";

// Syled Components
import * as S from "./styles";

// Hooks
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Helpers
import Head from "../_helpers/Head";

// Context
import { useAuthContext } from "../_context/authContext";

// Url
import { URL } from "../../services/urlConfig";

export const Login = () => {
  const { setHasUser } = useAuthContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    user ? setHasUser(user) : "";
  }, [setHasUser]);

  const fetchLogin = async () => {
    try {
      const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();

      if (data.auth) {
        sessionStorage.setItem("user", JSON.stringify(data.auth));
        setHasUser(data.auth);
      } else {
        console.error("Erro: data.auth está undefined no segundo login");
      }

      if (!data.errors) {
        Swal.fire({
          title: "Sucesso!",
          text: `${JSON.stringify(data.message)}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#111111d9",
        });

        navigate("/");
      }

      if (data.errors) {
        data.errors &&
          Swal.fire({
            title: "Error!",
            text: `${JSON.stringify(data.message)}`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#111111d9",
          });
      }
    } catch (error) {
      console.log("error ao enviar dados pela rota /login.", error);
    }
  };

  return (
    <S.Container>
      <Head
        title="Login"
        description="Agenda SyS, é um sistema de cadatros de contatos para serem visualizados como uma Agenda."
      />
      <S.Form>
        <h2> Faça Login no Sistema </h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={fetchLogin}>
            Entrar
          </button>
        </form>
      </S.Form>
    </S.Container>
  );
};
