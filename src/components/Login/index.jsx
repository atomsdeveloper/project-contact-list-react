// Syled Components
import * as S from "./styles";

// Types
import P from "prop-types";

// Helpers
import Head from "../../components/helpers/Head";

export const Login = ({ csrfToken }) => {
    return (
        <S.Container>
            <Head
                title="Login"
                description="Agenda SyS, é um sistema de cadatros de contatos para serem visualizados como uma Agenda."
            />

            <S.Form>
                <h2> Faça Login no Sistema </h2>
                <form action="http://localhost:3000/login" method="post">
                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                        />
                    </div>

                    <button type="submit">
                        Entrar
                    </button>
                    <input
                        type="hidden"
                        name="_csrf"
                        value={csrfToken}
                    />
                </form>
            </S.Form>
        </S.Container>
    );
};
Login.PropTypes = {
    csrfToken: P.string.isRequired,
}