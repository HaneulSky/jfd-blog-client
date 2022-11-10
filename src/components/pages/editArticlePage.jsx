import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getArticlesByIds,
    loadArticlesList,
    updateArticle
} from "../../store/articles";
import { validator } from "../../utils/validator";
import TextField from "../common/textField";
import TextAreaField from "../common/textAreaField";
import { Box, LinearProgress, Button } from "@mui/material";

const EditArticlePage = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadArticlesList());
        setData({
            ...ArticleById
        });
    }, []);
    useEffect(() => {
        document.title = "Редактирование статьи";
    }, []);

    const params = useParams();
    const { articleId } = params;
    const ArticleById = useSelector(getArticlesByIds(articleId));
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateArticle({
                ...data
            })
        );
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
        }
    };

    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    if (ArticleById && data) {
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
                    <h1>Редактирование статьи</h1>
                    <form onSubmit={handleSubmit}>
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
                            label="Ссылка"
                            type="text"
                            name="urlImage"
                            value={data.urlImage}
                            onChange={handleChange}
                            variant="standard"
                            sx={{ width: 450 }}
                        />
                        <TextField
                            label="Ссылка"
                            type="text"
                            name="link"
                            value={data.link}
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
    } else {
        return <LinearProgress sx={{ mt: 6 }} color="info" />;
    }
};

export default EditArticlePage;
