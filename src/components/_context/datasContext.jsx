import React from "react";
import P from "prop-types";

// URL
import { URL } from "../../services/urlConfig";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = React.createContext();

export const ContactProvider = ({ children }) => {
  const [data, setData] = React.useState({ contatos: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Erro de rede: ${response.status}`);
        }

        const datas = await response.json();

        if (!datas.contatos) {
          throw new Error("Dados não recebidos da API.");
        }

        setData({ contatos: datas.contatos });

        // Salva no localStorage
        localStorage.setItem("csrfToken", datas.csrfToken);
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
