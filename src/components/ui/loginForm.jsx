import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { validator } from "../../utils/validator";
import TextField from "../common/textField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/user";
import Loader from "../common/loader";

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const loginError = useSelector(getAuthErrors());
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен не корректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: { message: "Пароль должен быть не менее 8 символов", value: 8 }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";

        dispatch(login({ payload: data, redirect }));
        setLoading(true);
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            {isLoading && <Loader />}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                        marginTop: 10,
                        marginBottom: 5,
                        width: 90 + "%",
                        height: 340,
                        border: 0.5,
                        borderColor: "lightblue",
                        p: 3,
                        boxShadow: 5
                    },
                    justifyContent: "center"
                }}
            >
                <form style={{ marginTop: 10 }} onSubmit={handleSubmit}>
                    <TextField
                        label="электронная почта"
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                        variant="standard"
                        sx={{ width: 450 }}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        error={errors.password}
                        variant="standard"
                        sx={{ width: 450 }}
                    />
                    {loginError && (
                        <p className="text-danger" style={{ margin: 0 }}>
                            {loginError}
                        </p>
                    )}
                    <Button
                        sx={{ marginTop: 5 + "px", width: 200 }}
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={!isValid}
                    >
                        Войти
                    </Button>
                </form>
            </Box>
        </>
    );
};

export default LoginForm;
