// React
import React from "react";

// Types
import P from "prop-types";

// URL
import { URL_SERVER } from "../../services/urlConfig";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = React.createContext();

export const ContactProvider = ({ children }) => {
  const [data, setData] = React.useState({
    contatos: [],
    csrfToken: "",
    messages: [],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_SERVER}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": data.csrfToken,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Erro de rede: ${response.status}`);
        }

        const responseFetchHome = await response.json();

        if (data.error) {
          throw new Error(`Erro: ${responseFetchHome.error}`);
        }

        if (!responseFetchHome.csrfToken || !responseFetchHome.contatos) {
          throw new Error("Dados incompletos recebidos da API.");
        }

        setData({
          contatos: responseFetchHome.contatos,
          csrfToken: responseFetchHome.csrfToken,
          messages: responseFetchHome.messages,
        });

        // Salva no localStorage
        localStorage.setItem("csrfToken", responseFetchHome.csrfToken);
      } catch (error) {
        console.error("Erro ao buscar dados de contatos e csrfToken:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ContactContext.Provider value={{ data }}>
      {children}
    </ContactContext.Provider>
  );
};
ContactProvider.propTypes = {
  children: P.node.isRequired,
};
