import { useEffect, useRef } from "react";
import Quill from "quill";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function QuillEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

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

  return (
    <div className="border rounded-md">
      <div
        ref={editorRef}
        style={{
          minHeight: 200,
          backgroundColor: "#fff",
          color: "#000",
          padding: 10,
        }}
      />
    </div>
  );
}
