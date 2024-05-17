import styled from "styled-components";
import { useState } from "react";
import { getUserData } from "../store/api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await getUserData(username, password);
      localStorage.getItem("userToken")
        ? navigate("/home")
        : navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Wrapper>
      <StyledForm>
        <StyledLabel htmlFor="username">Username:</StyledLabel>
        <StyledInput
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <StyledButton type="button" onClick={handleLogin}>
          Login
        </StyledButton>
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;

const StyledForm = styled.form`
  background-color: #f4f4f4;
  padding: 50px;
  border-radius: 15px;
  width: 300px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-top: 10px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }
`;

export default Login;
