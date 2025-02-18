import React from "react";
import { Link } from "react-router-dom";

// Syled Components
import * as S from "./styles";

// Helpers
import Head from "../../components/_helpers/Head";

// Animations CSS
import AOS from "aos";
import "aos/dist/aos.css";

// Types
import P from "prop-types";

const Home = ({ contatos }) => {

  React.useEffect(() => {
    AOS.init({
      duration: 2500,
      once: true,
    });
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(newDate)
  }

  return (
    <S.Content>
      <Head
        title="Home"
        description="Agenda SyS, é um sistema de cadatros de contatos para serem visualizados como uma Agenda."
      />

      <S.Contacts>
        <h1>Agenda</h1>
        <p >Seus contatos estão abaixo</p>
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
                      <Link to={`/contato/index/${contato._id}`}>
                        Editar
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button id="delete">
                      <Link to={`/contato/delete/${contato._id}`}>
                        Excluir
                      </Link>
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
Home.PropTypes = {
  contatos: P.arrayOf(
    P.shape({
      name: P.string.isRequired,
      tel: P.string.isRequired,
      email: P.string.isRequired,
      created: P.string.isRequired,
    })
  ).isRequired
}

export default Home;
