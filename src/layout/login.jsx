import { Box } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                    marginTop: 10,
                    width: 700,
                    border: 0.5,
                    borderColor: "Blue",
                    p: 3,
                    boxShadow: 5
                },
                justifyContent: "center"
            }}
        >
            <div>
                {formType === "register" ? (
                    <>
                        <h3 className="mb-4">Регистрация</h3>
                        <RegisterForm />
                        <p>
                            Уже есть аккаунт?{" "}
                            <a role="button" onClick={toggleFormType}>
                                Войти
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <h3>Вход</h3>
                        <LoginForm />
                        <p>
                            Еще нет аккаунта?{" "}
                            <a role="button" onClick={toggleFormType}>
                                Зарегистрируйся
                            </a>
                        </p>
                    </>
                )}
            </div>
        </Box>
    );
};

export default Login;
