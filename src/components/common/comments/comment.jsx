import React from "react";
import PropTypes from "prop-types";
// import { formatDate } from "../../../utils/formatDate";
import { getCurrentUserId, getUserById } from "../../../store/user";
import { useSelector } from "react-redux";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { formatDate } from "../../../utils/formatDate";

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onRemove
}) => {
    const currentUserId = useSelector(getCurrentUserId());
    const user = useSelector(getUserById(userId));
    // console.log("currentUserId", userId);

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{user && user.name}</h5>
                    {currentUserId === userId && (
                        <button
                            className="btn btn-sm text-primary d-flex align-items-center"
                            onClick={() => onRemove(id)}
                        >
                            <CancelOutlinedIcon />
                        </button>
                    )}
                </div>
                <h6 className="card-subtitle mb-2 text-muted">
                    <span className="small"> {formatDate(created)}</span>
                </h6>
                <p className="card-text">{content}</p>
            </div>
        </div>
    );
};
Comment.propTypes = {
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default Comment;
