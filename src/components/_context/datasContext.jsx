import React from "react";
import P from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = React.createContext();

export const ContactProvider = ({ children }) => {
  const [data, setData] = React.useState({ contatos: [], csrfToken: "" });
  const [loading, setLoading] = React.useState(false);
  const hasFetched = React.useRef(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://project-contact-list-node-production.up.railway.app/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro de rede: ${response.status}`);
      }

      const datas = await response.json();

      if (!datas.csrfToken || !datas.contatos) {
        throw new Error("Dados incompletos recebidos da API.");
      }

      setData({ contatos: datas.contatos, csrfToken: datas.csrfToken });

      // Salva no localStorage
      localStorage.setItem("csrfToken", datas.csrfToken);
      setLoading(false);
    } catch (error) {
      console.error(
        "Erro ao buscar dados de contatos e csrfToken:",
        error.message
      );
    }
  };

  React.useEffect(() => {
    if (!hasFetched.current) {
      fetchData();
      hasFetched.current = true;
    }
  }, []);

  return (
    <ContactContext.Provider value={{ data, loading }}>
      {children}
    </ContactContext.Provider>
  );
};
ContactProvider.propTypes = {
  children: P.node.isRequired,
};
