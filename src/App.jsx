import React from "react";

// Navegation
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Context
import { AuthProvider } from "./components/_context/authContext";

// Components
import { NotFound } from "./components/NotFound";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Contact } from "./components/Contact";
import { Edit } from "./components/Edit";

// Lazy Components
const Home = React.lazy(() => import("./Templates/Home"));

// Loading
export const Loading = () => {
  return <h1>Loading</h1>;
};

function App() {
  const [contatos, setContatos] = React.useState([]);
  const [csrfToken, setCsrfToken] = React.useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const datas = await response.json();

      setContatos(datas.contatos);
      setCsrfToken(datas.csrfToken);
    } catch (error) {
      console.log("Error ao buscar dados de contatos e csrfToken.", error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />

        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={<Home contatos={contatos} csrfToken={csrfToken} />}
            />

            {/* Login */}
            <Route path="/login" element={<Login csrfToken={csrfToken} />} />
            <Route
              path="/register"
              element={<Register csrfToken={csrfToken} />}
            />

            {/* Contact */}
            <Route
              path="/contato"
              element={<Contact csrfToken={csrfToken} />}
            />
            <Route
              path="/contato/edit/:id"
              element={<Edit csrfToken={csrfToken} />}
            />

            <Route
              path="*"
              element={<NotFound text="Página não encontrada." />}
            />
          </Routes>
        </React.Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
