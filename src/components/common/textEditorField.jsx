import React, { useState } from "react";
import { ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from "prop-types";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditorField = ({ text }) => {
    const content = !text ? "Sample content state" : text;
    const _contentState = ContentState.createFromText(content);
    const raw = convertToRaw(_contentState);
    const [contentState, setContentState] = useState(raw);

    if (text) {
        return (
            <div
                style={{
                    border: "1px solid black",
                    minHeight: "6em",
                    cursor: "text"
                }}
            >
                <Editor
                    toolbar={{
                        options: [
                            "inline",
                            "blockType",
                            "fontSize",
                            "fontFamily",
                            "list",
                            "textAlign",
                            "link",
                            "embedded",
                            "remove"
                        ],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true }
                    }}
                    defaultContentState={contentState}
                    onContentStateChange={setContentState}
                    // placeholder="Write something!"
                    // wrapperClassName="wrapper-class"
                    // editorClassName="editor-class"
                    // toolbarClassName="toolbar-class"
                />
            </div>
        );
    } else {
        return <p>Text is loading</p>;
    }
};

TextEditorField.propTypes = {
    text: PropTypes.string
};

export default TextEditorField;
