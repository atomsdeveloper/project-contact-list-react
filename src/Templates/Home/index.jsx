// React
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Lib
import Swal from "sweetalert2";

// Syled Components
import * as S from "./styles";

// Context
import { ContactContext } from "../../components/_context/datasContext"; // Importa o contexto
import { useAuthContext } from "../../components/_context/authContext";

// Animations CSS
import AOS from "aos";
import "aos/dist/aos.css";

// Types
import P from "prop-types";

// URL
import { URL_SERVER } from "../../services/urlConfig";

const Home = () => {
  const { hasUser } = useAuthContext();

  const { data } = React.useContext(ContactContext); // Usa o contexto
  const csrfToken = data.csrfToken;

  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init({
      duration: 2500,
      once: true,
    });
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(newDate);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${URL_SERVER}/contact/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
        Authorization: `Bearer ${hasUser}`,
      },
    });

    const responseFetchDelete = await response.json();

    if (!responseFetchDelete.success) {
      Swal.fire({
        title: "Aviso!",
        text: `${responseFetchDelete.message}`,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#111111d9",
      }).then(() => {
        window.location.reload(); // Recarrega a página após o delete
      });
    }

    if (responseFetchDelete.success) {
      Swal.fire({
        title: "Sucesso!",
        text: `${responseFetchDelete.message}`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#111111d9",
      }).then(() => {
        window.location.reload(); // Recarrega a página após o delete
      });
    }
  };

  function handleRedirectFromRegisterContact() {
    navigate("/contato");
  }

  if (data.contatos.length <= 0) {
    return (
      <S.ContainerNotContacts>
        <h1>Ainda não temos contatos cadastrados no sistema.</h1>
        {hasUser && (
          <button type="button" onClick={handleRedirectFromRegisterContact}>
            Criar um contato na agenda.
          </button>
        )}
      </S.ContainerNotContacts>
    );
  }

  return (
    <>
      <S.ContainerHome>
        <S.ContainerTable>
          {data.contatos ? (
            <S.Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Sobrenome</th>
                  <th>Celular</th>
                  <th>E-mail</th>
                  <th>Data</th>
                  {hasUser ? <th>Ação</th> : ""}
                </tr>
              </thead>
              {data.contatos.map((contato, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{contato.name}</td>
                    <td>{contato.secondname}</td>
                    <td>{contato.tel}</td>
                    <td>{contato.email}</td>
                    <td>{formatDate(new Date(Date.now()))}</td>
                    {hasUser ? (
                      <>
                        <td>
                          <button id="edit">
                            <Link to={`/contato/edit/${contato.id}`}>
                              Editar
                            </Link>
                          </button>
                        </td>
                        <td>
                          <button
                            id="delete"
                            onClick={() => handleDelete(contato.id)}
                          >
                            <Link to="#">Excluir</Link>
                          </button>
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                </tbody>
              ))}
            </S.Table>
          ) : (
            <p>Não existem contatos na sua agenda.</p>
          )}
        </S.ContainerTable>
      </S.ContainerHome>
    </>
  );
};
Home.propTypes = {
  contatos: P.arrayOf(
    P.shape({
      name: P.string.isRequired,
      tel: P.string.isRequired,
      email: P.string.isRequired,
      created: P.string.isRequired,
    })
  ).isRequired,
};

export default Home;
