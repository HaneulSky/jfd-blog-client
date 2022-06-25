import React, { useState } from "react";
import ArticlesListPage from "../components/pages/articlesListPage";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import { IconButton } from "@mui/material";
import Information from "../components/common/information";

const Main = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <ArticlesListPage />
            <IconButton
                onClick={handleOpen}
                sx={{ position: "absolute", right: 30, bottom: 30 }}
                color="primary"
            >
                <BuildOutlinedIcon sx={{ width: 40, height: 40 }} />
            </IconButton>
            <Information onClose={handleClose} open={open} />
        </>
    );
};

export default Main;
