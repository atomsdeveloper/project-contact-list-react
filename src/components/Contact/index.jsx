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

export const Contact = () => {
  const navigate = useNavigate();
  const { fetchData, csrfToken } = React.useContext(ContactContext); // Usa o contexto

  const fetchRegisterContact = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const name = data.get("name");
    const secondname = data.get("secondname");
    const email = data.get("email");
    const tel = data.get("tel");

    try {
      const response = await fetch("http://localhost:3000/contato/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ name, secondname, email, tel }),
      });
      const data = await response.json();

      if (!data.success) {
        Swal.fire({
          title: "Error!",
          text: `${data.message}`,
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
      }
      fetchData();
      navigate("/");
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
        <h2> Casdastre um contato no sistema. </h2>
        <form onSubmit={(e) => fetchRegisterContact(e)}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="name" name="name" />
          </div>

          <div className="form-group">
            <label htmlFor="secondname">Sobrenome</label>
            <input type="secondname" name="secondname" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="tel">Telefone</label>
            <input type="tel" name="tel" />
          </div>

          <button type="submit">Salvar</button>
          <input type="hidden" name="_csrf" value={csrfToken} />
        </form>
      </S.Form>
    </S.Container>
  );
};
Contact.propTypes = {
  csrfToken: P.string.isRequired,
  edit: P.bool,
};
