import React from "react";

import * as S from "./styles";

import Head from "../_helpers/Head";

// Context
import { ContactContext } from "../_context/datasContext"; // Importa o contexto

// Hooks
import { useParams, useNavigate } from "react-router-dom";

// Types
import P from "prop-types";

// Lib
import Swal from "sweetalert2";

// URL
import { URL_SERVER } from "../../services/urlConfig";
import { useAuthContext } from "../_context/authContext";

export const Edit = () => {
  const { hasUser } = useAuthContext();
  const { data } = React.useContext(ContactContext);

  const navigate = useNavigate();

  const { id } = useParams();
  console.log("ID: ", id);

  const [formData, setFormData] = React.useState({
    name: "",
    secondname: "",
    email: "",
    tel: "",
  });

  const csrfToken = data.csrfToken;

  const fetchBuscarId = async () => {
    try {
      const response = await fetch(`${URL_SERVER}/contact/index/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
          Authorization: `Bearer ${hasUser}`,
        },
        credentials: "include",
      });
      const data = await response.json();

      if (data && data.contato) {
        setFormData({
          name: data.contato.name || "",
          secondname: data.contato.secondname || "",
          email: data.contato.email || "",
          tel: data.contato.tel || "",
        });
      }

      console.log("Contatos response: ", data);

      if (!data.success) {
        Swal.fire({
          title: "Error!",
          text: `${data.message}`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#111111d9",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.log("Error ao buscar dados de contatos para editar.", error);
    }
  };

  React.useEffect(() => {
    fetchBuscarId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Atualiza o estado quando o usuário digita no formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recarregar a página

    try {
      const response = await fetch(`${URL_SERVER}/contact/edit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
          Authorization: `Bearer ${hasUser}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.errors) {
        Swal.fire({
          title: "Sucesso!",
          text: `${data.message}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#111111d9",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
    }
  };

  return (
    <S.Container>
      <Head
        title="Cadastro Contato"
        description="Agenda SyS, é um sistema de cadatros de contatos para serem visualizados como uma Agenda."
      />
      <S.Form>
        <h2> Editar contato no sistema. </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="secondname">Sobrenome</label>
            <input
              type="secondname"
              name="secondname"
              value={formData.secondname}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tel">Telefone</label>
            <input
              type="tel"
              name="tel"
              value={formData.tel}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button type="submit">Salvar</button>
          <input type="hidden" name="_csrf" value={csrfToken} />
        </form>
      </S.Form>
    </S.Container>
  );
};
Edit.propTypes = {
  csrfToken: P.string.isRequired,
};
