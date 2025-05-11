import React from "react";

// Syled Components
import * as S from "./styles";

// Hooks
import { useNavigate } from "react-router-dom";

// Hooks
import Swal from "sweetalert2";

// Helpers
import Head from "../_helpers/Head";

// Context
import { ContactContext } from "../_context/datasContext";

// Url
import { URL } from "../../services/urlConfig";

export const Register = () => {
  const navigate = useNavigate();

  const { data, loading } = React.useContext(ContactContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleFetchRegister = async (e) => {
    e.preventDefault();

    if (loading) {
      console.warn("Ainda carregando dados. Aguarde...");
      return;
    }

    try {
      const response = await fetch(`${URL}/contact/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": data.csrfToken, // Enviando o token no cabeçalho
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const { errors, message } = await response.json();
      console.log("/registro", errors);

      if (!errors || message) {
        Swal.fire({
          title: "Sucesso!",
          text: `${JSON.stringify(message)}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#111111d9",
        });
        navigate("/");
      }

      errors &&
        Swal.fire({
          title: "Error!",
          text: `${JSON.stringify(message)}`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#111111d9",
        });
    } catch (error) {
      console.log("error ao enviar dados pela rota /register.", error);
    }
  };

  return (
    <S.Container>
      <Head
        title="Cadastro Usuário"
        description="Agenda SyS, é um sistema de cadatros de contatos para serem visualizados como uma Agenda."
      />

      {loading ? (
        <p>Carregando token de segurança...</p>
      ) : (
        <S.Form>
          <h2> Faça cadastro de um usuário no sistema. </h2>
          <form onSubmit={(e) => handleFetchRegister(e)}>
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
            <button type="submit">Cadastrar</button>
            {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
          </form>
        </S.Form>
      )}
    </S.Container>
  );
};
