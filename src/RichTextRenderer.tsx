import React from "react";
import { Editor, EditorState, convertFromRaw, ContentBlock, DraftStyleMap } from "draft-js";
import "./TextEditor.css";
import "./RichEditorStyle.css";
import { BLOCKQUOTE } from "./TextEditorConstants";
import { useState } from "react";
import { createRef } from "react";
import { useEffect } from "react";

const RichText = (props: any) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const editorRef = createRef<Editor>()

    const styleMap: DraftStyleMap = {
      CODE: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        width: "100%",
        fontFamily: props?.fontFamily ?? 'serif',
        fontSize: 16,
        flexWrap: 'wrap'
      }
    };

    //function to get the style for blockquote
  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case BLOCKQUOTE:
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

    useEffect(() => {
      try {
        if (props?.initialData) {
          setEditorState(EditorState.createWithContent(
            convertFromRaw(JSON.parse(props?.initialData))
          ))
        } else {
          setEditorState(EditorState.createEmpty())
        }
      } catch (error) {
        console.log("error is", error);
        setEditorState(EditorState.createEmpty())
      }
    }, [props?.initialData])

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    if (editorState) {
      return (
        <Editor
          onChange={() => {}}
          ref={editorRef}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          readOnly={true}
        />
      );
    }
    return null;
}

export {RichText}
