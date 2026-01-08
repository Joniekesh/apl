import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import Quill from "quill";
export default function QuillEditor({ value, onChange }) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    useEffect(() => {
        if (!editorRef.current || quillRef.current)
            return;
        const quill = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    [
                        "link",
                        // "image"
                    ],
                    ["clean"],
                ],
            },
        });
        quill.on("text-change", () => {
            onChange(quill.root.innerHTML);
        });
        quillRef.current = quill;
    }, [onChange]);
    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value;
        }
    }, [value]);
    return (_jsx("div", { className: "border rounded-md", children: _jsx("div", { ref: editorRef, style: {
                minHeight: 200,
                backgroundColor: "#fff",
                color: "#000",
                padding: 10,
            } }) }));
}
