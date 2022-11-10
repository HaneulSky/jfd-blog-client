import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList from "../../common/comments/commentList";
import AddCommentForm from "../addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../../store/comments";
import { useParams } from "react-router-dom";
import styles from "./comments.module.css";

const Comments = () => {
    const { articleId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentsList(articleId));
    }, [articleId]);

    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, articleId: articleId }));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div className={styles.container}>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading"
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
