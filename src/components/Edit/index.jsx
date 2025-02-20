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

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchData, csrfToken } = React.useContext(ContactContext); // Usa o contexto
  const [formData, setFormData] = React.useState({
    name: "",
    secondname: "",
    email: "",
    tel: "",
  });

  const fetchBuscarId = async () => {
    try {
      const response = await fetch(
        `https://project-contact-list-node-production.up.railway.app/contato/index/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data && data.contato) {
        setFormData({
          name: data.contato.name || "",
          secondname: data.contato.secondname || "",
          email: data.contato.email || "",
          tel: data.contato.tel || "",
        });
      }

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
      const response = await fetch(
        `https://project-contact-list-node-production.up.railway.app/contato/edit/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!data.errors) {
        Swal.fire({
          title: "Sucesso!",
          text: `${data.message}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#111111d9",
        }).then(() => {
          fetchData(); // Atualiza os contatos sem recarregar
          navigate("/");
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
        <h2> Edit um contato no sistema. </h2>
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
