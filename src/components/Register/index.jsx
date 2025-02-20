import React from "react";

// Syled Components
import * as S from "./styles";

// Context
import { ContactContext } from "../_context/datasContext";

// Hooks
import { useNavigate } from "react-router-dom";

// Hooks
import Swal from "sweetalert2";

// Helpers
import Head from "../_helpers/Head";

export const Register = () => {
  const navigate = useNavigate();
  const { csrfToken } = React.useContext(ContactContext); // Usa o contexto

  const fetchRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Enviando o token no cabeçalho
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

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

      data.errors &&
        Swal.fire({
          title: "Error!",
          text: `${data.errors[0]}`,
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

      <S.Form>
        <h2> Faça cadastro de um usuário no sistema. </h2>
        <form onSubmit={(e) => fetchRegister(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" />
          </div>

          <button type="submit">Cadastrar</button>
          <input type="hidden" name="_csrf" value={csrfToken} />
        </form>
      </S.Form>
    </S.Container>
  );
};
