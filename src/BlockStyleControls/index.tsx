import React from "react";
import "../TextEditor.css";
import "../RichEditorStyle.css";
import {
  ORDERED_LIST_NOT_SELECTED,
  ORDERED_LIST_SELECTED,
  UNORDERED_LIST_SELECTED,
  UNORDERED_LIST_NOT_SELECTED,
  CODE_SELECTED,
  CODE_NOT_SELECTED,
  BLOCK_QUOTE_SELECTED,
  BLOCK_QUOTE_NOT_SELECTED,
  BLOCKQUOTE,
  CODE_BLOCK,
  UNORDERED_LIST,
  ORDERED_LIST
} from "../TextEditorConstants";

const BLOCK_TYPES = [
  {
    name: ORDERED_LIST,
    unselectedStyle: ORDERED_LIST_NOT_SELECTED,
    selectedStyle: ORDERED_LIST_SELECTED,
    checkOption: "orderedListOption",
    type: "block"
  },
  {
    name: UNORDERED_LIST,
    unselectedStyle: UNORDERED_LIST_NOT_SELECTED,
    selectedStyle: UNORDERED_LIST_SELECTED,
    checkOption: "unorderedListOption",
    type: "block"
  },
  {
    name: CODE_BLOCK,
    unselectedStyle: CODE_NOT_SELECTED,
    selectedStyle: CODE_SELECTED,
    checkOption: "codeOption",
    type: "block"
  },
  {
    name: BLOCKQUOTE,
    unselectedStyle: BLOCK_QUOTE_NOT_SELECTED,
    selectedStyle: BLOCK_QUOTE_SELECTED,
    checkOption: "quoteOption",
    type: "block"
  }
];

const StyleButton = (props: any) => {
  const onToggle = (e: any) => {
    e.preventDefault();
    props.onToggle(props.item.name);
  };

  let className = props.item.unselectedStyle;
    if (props.active) {
      className += props.item.selectedStyle;
    }

    return <i onMouseDown={onToggle} className={className} />;
}

const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(
        type =>
          props[type.checkOption] && (
            <StyleButton
              key={type.name}
              active={type.name === blockType}
              onToggle={() => props.onToggle(type.name)}
              item={type}
            />
          )
      )}
    </div>
  );
};

export {StyleButton, BlockStyleControls}
