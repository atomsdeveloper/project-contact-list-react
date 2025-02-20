import React from "react";
import P from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = React.createContext();

export const ContactProvider = ({ children }) => {
  const [contatos, setContatos] = React.useState([]);
  const [csrfToken, setCsrfToken] = React.useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://project-contact-list-node-production.up.railway.app",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const datas = await response.json();

      setContatos(datas.contatos);
      setCsrfToken(datas.csrfToken);
    } catch (error) {
      console.log("Erro ao buscar dados de contatos e csrfToken.", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContactContext.Provider value={{ contatos, csrfToken, fetchData }}>
      {children}
    </ContactContext.Provider>
  );
};
ContactProvider.propTypes = {
  children: P.node.isRequired,
};
