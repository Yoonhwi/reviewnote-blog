"use client";
import { EditorState } from "draft-js";
import { useState } from "react";
import EditorWrapper from "./editor-wrapper";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <EditorWrapper
      placeholder="내용을 작성해주세요."
      localization={{
        locale: "ko",
      }}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{
        height: "400px",
        width: "w-full",
        border: "1px solid lightgray",
        padding: "20px",
      }}
      toolbarStyle={{
        width: "w-full",
      }}
    />
  );
};

export default Editor;
