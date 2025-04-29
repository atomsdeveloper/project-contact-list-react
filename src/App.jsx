import React from "react";

// Navegation
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Contexts
import { AuthProvider } from "./components/_context/authContext";
import { ContactProvider } from "./components/_context/datasContext";

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
  return (
    <ContactProvider>
      <BrowserRouter>
        <AuthProvider>
          <Header />

          <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Login */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Contact */}
              <Route path="/contato" element={<Contact />} />
              <Route path="/contato/edit/:id" element={<Edit />} />

              <Route
                path="*"
                element={<NotFound text="Página não encontrada." />}
              />
            </Routes>
          </React.Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ContactProvider>
  );
}
export default App;
