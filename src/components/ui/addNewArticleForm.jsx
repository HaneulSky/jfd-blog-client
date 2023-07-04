import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import TextField from "../common/textField";
import { validator } from "../../utils/validator";
import { useDispatch } from "react-redux";
import { createNewArticle } from "../../store/articles";
import TextAreaField from "../common/textAreaField";

const AddNewArticleForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        title: {
            isRequired: {
                message: "Введите заголовок статьи"
            }
        },
        description: {
            isRequired: {
                message: "Обязательно заполните короткое описание статьи"
            },
            max: {
                message: "Описание должно составлять не более 60 символов",
                value: 60
            }
        },
        content: {
            isRequired: {
                message: "Текст статьи обязателен для заполнения"
            }
        },
        urlImage: {
            isLink: {
                message: "Проверьте правильность написания ссылки"
            }
        },
        link: {
            isLink: {
                message: "Проверьте правильность написания ссылки"
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
    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data
        };
        dispatch(createNewArticle(newData));
        console.log(newData);
        clearForm();
    };

    return (
        <>
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
                <h1>Добавление новой статьи</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <TextField
                        label="Заголовок"
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        error={errors.title}
                        variant="standard"
                        sx={{ width: 450 }}
                    />
                    <TextField
                        label="Короткий текст"
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        error={errors.description}
                        variant="standard"
                        sx={{ width: 450 }}
                    />
                    <TextAreaField
                        label="Текст"
                        type="text"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        error={errors.content}
                        variant="standard"
                        sx={{ width: 450 }}
                    />
                    <TextField
                        label="Вставьте ссылку на изображение"
                        type="url"
                        name="urlImage"
                        value={data.urlImage}
                        error={errors.urlImage}
                        onChange={handleChange}
                        variant="standard"
                        sx={{ width: 450 }}
                    />
                    <TextField
                        label="Ссылка на источник"
                        type="text"
                        name="link"
                        value={data.link}
                        error={errors.link}
                        onChange={handleChange}
                        variant="standard"
                        sx={{ width: 450 }}
                    />
                    <Button type="submit" disabled={!isValid}>
                        Опубликовать
                    </Button>
                </form>
            </Box>
        </>
    );
};

export default AddNewArticleForm;
