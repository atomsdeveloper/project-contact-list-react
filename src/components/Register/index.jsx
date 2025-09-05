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
import { useAuthContext } from "../_context/authContext";

// Url
import { URL_SERVER } from "../../services/urlConfig";

export const Register = () => {
  const { hasUser } = useAuthContext();

  const navigate = useNavigate();

  const { data, loading } = React.useContext(ContactContext);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleFetchRegister = async (e) => {
    e.preventDefault();

    if (loading) {
      console.warn("Ainda carregando dados. Aguarde...");
      return;
    }

    try {
      const response = await fetch(`${URL_SERVER}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": data.csrfToken, // Enviando o token no cabeçalho
          Authorization: `Bearer ${hasUser}`,
        },
        body: JSON.stringify({ email, password, name }),
        credentials: "include",
      });
      const responseFetchRegister = await response.json();

      responseFetchRegister.message &&
        Swal.fire({
          title: "Error!",
          text: `${responseFetchRegister.message}`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#38bdf8",
        });

      responseFetchRegister.errors &&
        Swal.fire({
          title: "Error!",
          text: `${responseFetchRegister.errors[0]}`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#38bdf8",
        });

      // If not errors
      responseFetchRegister.success &&
        Swal.fire({
          title: "Success!",
          text: `${responseFetchRegister.success[0]}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#38bdf8",
        }).then(() => {
          navigate("/login");
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
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
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
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Cadastrar</button>
            <input type="hidden" name="_csrf" value={data.csrfToken} />
          </form>
        </S.Form>
      )}
    </S.Container>
  );
};
