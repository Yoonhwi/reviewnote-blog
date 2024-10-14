import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["link", "image", "code-block"],
  ["clean"],
];

interface QuillEditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const QuillEditor = ({ defaultValue = "", onChange }: QuillEditorProps) => {
  const loaded = useRef(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      if (loaded.current) return;
      loaded.current = true;
      const { default: Quill } = await import("quill");
      quillRef.current = new Quill("#editor-div", {
        theme: "snow",
        modules: { toolbar },
      });

      if (!onChange) return;
      quillRef.current.on("text-change", () => {
        onChange(quillRef.current.root.innerHTML);
      });

      quillRef.current.root.innerHTML = defaultValue;
    })();
  }, [onChange]);

  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.root.innerHTML = defaultValue;
  }, [defaultValue]);

  return (
    <div>
      <div id="editor-div" className="min-h-[480px]" />
    </div>
  );
};

export default QuillEditor;
