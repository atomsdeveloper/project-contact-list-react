import React from "react";

// Context
import { ContactContext } from "../_context/datasContext";

// Syled Components
import * as S from "./styles";

// Hooks
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Helpers
import Head from "../_helpers/Head";
import { useAuthContext } from "../_context/authContext";

export const Login = () => {
  const { setHasUser } = useAuthContext();
  const { csrfToken } = React.useContext(ContactContext); // Usa o contexto
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    user ? setHasUser(user) : "";
  }, [setHasUser]);

  const fetchLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
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
          text: `${data.success[0]}`,
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
            text: `${data.errors[0]}`,
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
        <form onSubmit={(e) => fetchLogin(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" />
          </div>

          <button type="submit">Entrar</button>
          <input type="hidden" name="_csrf" value={csrfToken} />
        </form>
      </S.Form>
    </S.Container>
  );
};
