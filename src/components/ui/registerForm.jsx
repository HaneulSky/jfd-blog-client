import React, { useState, useEffect } from "react";

import TextField from "../common/textField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { validator } from "../../utils/validator";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/user";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        name: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

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
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должено состаять миниму из 3 символов",
                value: 2
            }
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
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data
        };
        dispatch(signUp(newData));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                    marginTop: 10,
                    width: 500,
                    marginBottom: 5,
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
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <Button
                    sx={{ marginTop: 3, width: 200, marginLeft: 18 }}
                    variant="outlined"
                    color="primary"
                    type="submit"
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Box>
    );
};

export default RegisterForm;
