import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";

const EditorWrapper = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

export default EditorWrapper;
