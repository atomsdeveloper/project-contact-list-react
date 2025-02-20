import React from "react";
import { Link } from "react-router-dom";

// Lib
import Swal from "sweetalert2";

// Syled Components
import * as S from "./styles";

// Helpers
import Head from "../../components/_helpers/Head";

// Context
import { ContactContext } from "../../components/_context/datasContext"; // Importa o contexto

// Animations CSS
import AOS from "aos";
import "aos/dist/aos.css";

// Types
import P from "prop-types";

const Home = () => {
  const { contatos, csrfToken } = React.useContext(ContactContext); // Usa o contexto
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
    const response = await fetch(
      `https://project-contact-list-node-production.up.railway.app/contato/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    if (!data.success) {
      Swal.fire({
        title: "Aviso!",
        text: `${data.message}`,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#111111d9",
      }).then(() => {
        window.location.reload(); // Recarrega a página após o delete
      });
    }

    if (data.success) {
      Swal.fire({
        title: "Sucesso!",
        text: `${data.message}`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#111111d9",
      }).then(() => {
        window.location.reload(); // Recarrega a página após o delete
      });
    }
  };

  return (
    <S.Content>
      <Head
        title="Home"
        description="Agenda SyS, é um sistema de cadatros de contatos para serem visualizados como uma Agenda."
      />

      <S.Contacts>
        <h1>Agenda</h1>
        <p>Seus contatos estão abaixo</p>
        <span></span>

        {/* {console.log("Home: ", contatos)} */}
        {contatos ? (
          <S.Table>
            {contatos.map((contato, index) => (
              <tbody key={index}>
                <tr>
                  <td>{contato.name}</td>
                  <td>{contato.tel}</td>
                  <td>{contato.email}</td>
                  <td>{formatDate(contato.created)}</td>
                  <td>
                    <button id="edit">
                      <Link to={`/contato/edit/${contato._id}`}>Editar</Link>
                    </button>
                  </td>
                  <td>
                    <button
                      id="delete"
                      onClick={() => handleDelete(contato._id)}
                    >
                      <Link to="/">Excluir</Link>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </S.Table>
        ) : (
          <p>Não existem contatos na sua agenda.</p>
        )}
      </S.Contacts>
    </S.Content>
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
