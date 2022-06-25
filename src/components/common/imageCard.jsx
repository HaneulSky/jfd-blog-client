import React from "react";
import PropTypes from "prop-types";

const ImageCard = ({ image, articleTitle }) => {
    return (
        <div
            style={{
                position: "relative",
                paddingTop: 56.25 + "%",
                width: 30 + "%"
            }}
        >
            <img
                src={image}
                alt={"Картинка к статье " + articleTitle}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 100 + "%",
                    height: "auto",
                    borderRadius: 5 + "%"
                }}
            ></img>
        </div>
    );
};

ImageCard.propTypes = {
    image: PropTypes.string,
    articleTitle: PropTypes.string
};

export default ImageCard;
