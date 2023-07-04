import React from "react";
import PropTypes from "prop-types";
import imageStyles from "./imageCard.module.css";

const ImageCard = ({ image, articleTitle }) => {
    return (

            <img
                src={image}
                alt={"Картинка к статье " + articleTitle}
                className={imageStyles.image}
            ></img>

    );
};

ImageCard.propTypes = {
    image: PropTypes.string,
    articleTitle: PropTypes.string
};

export default ImageCard;
