import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Input from "../ui/Input";

function Login() {
  return (
    <Main>
      <section>
        <img src={Logo} style={{ width: "75px" }} alt="Logo" />
        <h2>Welcome To Chatix</h2>
        <p>please login to you account</p>
        <form>
          <Input />
          <Input />
          <button>Login</button>
        </form>
      </section>
    </Main>
  );
}

export default Login;

const Main = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--text-color);
`;
