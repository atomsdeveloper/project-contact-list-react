import { useEffect } from "react";

// Syled Components
import * as S from "./styles";

// Components

// Helpers
import Head from "../../components/helpers/Head";

// Animations CSS
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <S.Content>
      <Head
        title="Home"
        description="Agenda SyS, é um sistema de cadatros de contatos para serem visualizados como uma Agenda."
      />

      <p>Teste</p>
    </S.Content>
  );
};
export default Home;