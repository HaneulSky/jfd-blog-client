import React, { createRef } from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ error, name, value, onChange, label }) => {
    const myRef = createRef();
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className=" mb-4input-group has-validation">
            <textarea
                id={name}
                value={value}
                onChange={handleChange}
                name={name}
                ref={myRef}
                className={getInputClasses()}
                label={label}
                rows="5"
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextAreaField;
