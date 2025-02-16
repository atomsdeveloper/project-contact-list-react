
import React, { Suspense, lazy } from "react";

// Navegation
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Components
import { NotFound } from "./components/NotFound";
import { Header } from "./components/Header";
import { Login } from "./components/Login";

// Lazy Components
const Home = lazy(() => import("./Templates/Home"));

// Loading
export const Loading = () => {
  return (
    <h1>Loading</h1>
  )
}

function App() {
  const [contatos, setContatos] = React.useState([]);
  const [csrfToken, setCsrfToken] = React.useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });
      const datas = await response.json();


      setContatos(datas.contatos);
      setCsrfToken(datas.csrfToken);
    } catch (error) {
      console.log("Error ao buscar dados.", error);
    }
  }
  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <BrowserRouter>
      <Header />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home contatos={contatos} />} />
          <Route path="/login" element={<Login csrfToken={csrfToken} />} />
          <Route path="*" element={<NotFound text="Página não encontrada." />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App