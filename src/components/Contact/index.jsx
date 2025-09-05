import * as S from "./styles";

import React from "react";

import Head from "../_helpers/Head";

// Context
import { ContactContext } from "../_context/datasContext"; // Importa o contexto

// Lib
import Swal from "sweetalert2";

// Router
import { useNavigate } from "react-router-dom";

// Types
import P from "prop-types";

// Url
import { URL_SERVER } from "../../services/urlConfig";
import { useAuthContext } from "../_context/authContext";

export const Contact = () => {
  const { hasUser } = useAuthContext();
  const navigate = useNavigate();
  const { data } = React.useContext(ContactContext); // Usa o contexto

  if (!hasUser) {
    Swal.fire({
      title: "Aviso!",
      text: `Você precisa fazer login para acessar está página.`,
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#111111d9",
    }).then(() => {
      navigate("/");
    });
  }

  const csrfToken = data.csrfToken;

  // Escrever estado para os valores do fomulário
  const [name, setName] = React.useState("");
  const [secondname, setSecondName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState("");

  const fetchRegisterContact = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL_SERVER}/contact/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
          Authorization: `Bearer ${hasUser}`,
        },
        credentials: "include",
        body: JSON.stringify({ name, secondname, email, tel }),
      });
      const data = await response.json();

      if (!data.success) {
        Swal.fire({
          title: "Error!",
          text: `${data.errors.map((err) => err)}`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#111111d9",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: `Contato criado com sucesso.`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#111111d9",
        });
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log("error ao enviar dados pela rota /login.", error);
    }
  };
  return (
    <S.Container>
      <Head
        title="Cadastro Contato"
        description="Agenda SyS, é um sistema de cadatros de contatos para serem visualizados como uma Agenda."
      />
      <S.Form>
        <h2> Faça o cadastro de um contato no Sistema </h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Sobrenome:</label>
            <input
              id="lastname"
              type="text"
              name="secondname"
              autoComplete="family-name"
              value={secondname}
              onChange={(e) => setSecondName(e.target.value)}
              required
            />
          </div>

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
            <label htmlFor="tel">Telefone:</label>
            <input
              id="tel"
              type="tel"
              name="tel"
              autoComplete="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={fetchRegisterContact}>
            Cadastrar
          </button>
        </form>
      </S.Form>
    </S.Container>
  );
};
Contact.propTypes = {
  csrfToken: P.string.isRequired,
  edit: P.bool,
};
