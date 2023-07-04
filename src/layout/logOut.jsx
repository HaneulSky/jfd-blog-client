import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/user";
import { LinearProgress } from "@mui/material";

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <LinearProgress sx={{ mt: 6 }} color="info" />;
};

export default LogOut;
