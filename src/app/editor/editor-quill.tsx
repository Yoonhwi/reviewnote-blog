import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import Quill from "quill";
import { addImage } from "../request/storage";

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
  const quillRef = useRef<Quill>();
  const loaded = useRef(false);

  useEffect(() => {
    (async () => {
      if (loaded.current) return;
      loaded.current = true;
      const { default: Quill } = await import("quill");

      quillRef.current = new Quill("#editor-div", {
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbar,
            handlers: {
              image: handleImageUpload,
            },
          },
        },
      });

      if (!onChange) return;
      quillRef.current.on("text-change", () => {
        onChange(quillRef.current!.root.innerHTML);
      });

      quillRef.current.root.innerHTML = defaultValue;
    })();
  }, [onChange]);

  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.root.innerHTML = defaultValue;
  }, [defaultValue]);

  const handleImageUpload = () => {
    console.log("hit");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      addImage(formData).then((res) => {
        const imgSrc = res.data;
        if (!quillRef.current) return;
        const range = quillRef.current.getSelection();
        quillRef.current.insertEmbed(range?.index || 0, "image", imgSrc);
      });
    };
  };

  return (
    <div>
      <div id="editor-div" className="h-[480px] min-h-[480px]" />
    </div>
  );
};

export default QuillEditor;
