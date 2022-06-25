import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

const Information = ({ onClose, open }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Привет, рада видеть Вас в моем блоге!
                </Typography>

                <ul id="modal-modal-description" style={{ mt: 2 }}>
                    <li>
                        Читать статьи могут только авторизованные пользователи.
                    </li>
                    <li>
                        Для добавления новой статьи нужно авторизоваться, если
                        аккаунта еще нет зарегистрируйтесь.
                    </li>
                </ul>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Приятного чтения! :)
                </Typography>
            </Box>
        </Modal>
    );
};

Information.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};

export default Information;
