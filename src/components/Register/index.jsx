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

export const Register = () => {
  const navigate = useNavigate();
<<<<<<< HEAD

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
      const response = await fetch(
        "https://project-contact-list-node-production.up.railway.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": data.csrfToken, // Enviando o token no cabeçalho
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );
      const { errors, message } = await response.json();
      console.log("/registro", errors, message);
=======
  const { data } = React.useContext(ContactContext); // Usa o contexto
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const fetchRegister = async () => {
    const csrfToken = localStorage.getItem("csrfToken");
    try {
      if (data.csrfToken === csrfToken) {
        const response = await fetch(
          "https://project-contact-list-node-production.up.railway.app/registro",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken, // Enviando o token no cabeçalho
            },
            // credentials: "include",
            body: JSON.stringify({ email, password }),
          }
        );
        const data = await response.json();
        return data;
      }
>>>>>>> 51876bba384618a085a32e3b1d58f02f04035be1

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

<<<<<<< HEAD
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
          </form>
        </S.Form>
      )}
=======
      <S.Form>
        <h2> Faça cadastro de um usuário no sistema. </h2>
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

          <button type="button" onClick={fetchRegister}>
            Cadastrar
          </button>
          {/* <input type="hidden" name="_csrf" value={csrfToken} />; */}
        </form>
      </S.Form>
>>>>>>> 51876bba384618a085a32e3b1d58f02f04035be1
    </S.Container>
  );
};
