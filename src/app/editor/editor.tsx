"use client";
import { EditorState } from "draft-js";
import { useState } from "react";
import EditorWrapper from "./editor-wrapper";

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
        width: "100%",
        border: "3px solid lightgray",
        padding: "20px",
      }}
    />
  );
};

export default Editor;
