import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";


// Components
import { NotFound } from "./components/NotFound"

// Lazy Components
const Home = lazy(() => import("./Templates/Home"));

// Loading
export const Loading = () => {
  return (
    <h1>Loading</h1>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <div>Header</div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound text="Página não encontrada." />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App