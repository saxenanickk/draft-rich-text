import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentBlock,
  DraftStyleMap,
  DraftHandleValue
} from "draft-js";
import "./TextEditor.css";
import "./RichEditorStyle.css";
import {
  IMAGE_UPLOAD,
  WEBLINK,
  ATTACHMENT,
  VIDEO_UPLOAD,
  AUDIO_UPLOAD,
  LINK,
  BLOCKQUOTE,
  FILE
} from "./TextEditorConstants";
import {LinkInput} from "./LinkInput";
import { BlockStyleControls } from "./BlockStyleControls";
import { InlineStyleControls } from "./InlineStyleControls";
//@ts-ignore
import createStyles from "draft-js-custom-styles";
import { useEffect } from "react";
import { useState } from "react";
import { createRef } from "react";

type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;

const customStyleMap = {
  MARK: {
    backgroundColor: "Yellow",
    fontStyle: "italic"
  }
};

const { styles, customStyleFn } = createStyles(
  ["color", "font-size"],
  "CUSTOM_",
  customStyleMap
);

const bottomIcons = [
  { name: WEBLINK, type: LINK, fileType: ".*", checkOption: "linkUpload" },
  {
    name: ATTACHMENT,
    type: FILE,
    fileType: ".pdf,.doc,.docx,",
    checkOption: "fileUpload"
  },
  {
    name: IMAGE_UPLOAD,
    type: FILE,
    fileType: ".png,.jpeg,.jpg",
    checkOption: "imageUpload"
  },
  {
    name: VIDEO_UPLOAD,
    type: FILE,
    fileType: ".*",
    checkOption: "videoUpload"
  },
  { name: AUDIO_UPLOAD, type: FILE, fileType: ".*", checkOption: "audioUpload" }
];

const TextEditor = (props: any) => {
  // const [userSelectedInlineStyles, setUserSelectedInlineStyles] = useState<any[]>([])
  // const [selectedBlockType, setSelectedBlockType] = useState(null)
  const [isInsertLink, setIsInsertLink] = useState(false)
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const editorRef = createRef<Editor>()

  const fileOpener: any = [];
  const initialWidth = 1920;
  // let hexColor = "#000";

  // Custom overrides for "code" style.
  const styleMap: DraftStyleMap | undefined = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      width: "60%",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2
    }
  };

  const onChange = (editorState: EditorState) => setEditorState(editorState)
  const handleKeyCommand = (command: string): DraftHandleValue => _handleKeyCommand(command);

  const onTab = (e: SyntheticKeyboardEvent) => _onTab(e);
  const toggleBlockType = (type: any) => _toggleBlockType(type);
  const toggleInlineStyle = (style: any) => _toggleInlineStyle(style);

  // Todo call callback after state update
  // const updateEditorState = (editorState: any, cb?: any) => setEditorState(editorState);

  useEffect(() => {
    try {
      if (props?.initialData) {
        setEditorState(EditorState.createWithContent(
          convertFromRaw(JSON.parse(props?.initialData))
        ) as any)
      } else {
        setEditorState(EditorState.createEmpty() as any)
      }
    } catch (error) {
      setEditorState(EditorState.createEmpty() as any)
    }
  }, [props?.initialData])

  // const checkStyleAvailibility = (inlineStyle: any) => {
  //   return userSelectedInlineStyles.indexOf(inlineStyle) >= 0;
  // };

  const focusEditor = () => {
    if (editorRef?.current !== undefined) setTimeout(() => {editorRef?.current?.focus()}, 5);
  };

  // const addOrRemoveInlineStyle = (inlineStyle: any) => {
  //   if (userSelectedInlineStyles.indexOf(inlineStyle) >= 0) {
  //     let tr = userSelectedInlineStyles.slice();
  //     _.remove(tr, (item: any) => item === inlineStyle);
  //     setUserSelectedInlineStyles(tr)
  //   } else {
  //     setUserSelectedInlineStyles([
  //       ...userSelectedInlineStyles,
  //       inlineStyle
  //     ])
  //   }
  // };

  // const  addBlockType = (blockType: any) => {
  //   if (selectedBlockType === blockType) {
  //     setSelectedBlockType(null)
  //   } else {
  //     setSelectedBlockType(blockType)
  //   }
  // };

  // const checkBlockTypeAvailibility = (blockType: any) => {
  //   return selectedBlockType === blockType;
  // };
  
  //function to get the style for blockquote
  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case BLOCKQUOTE:
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  const _handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const _onTab = (e: any)  => {
    console.log("tab it");
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
    focusEditor();
  }

  const _toggleBlockType = (blockType: any)=> {
    console.log("toggling the block type", blockType);
    onChange(RichUtils.toggleBlockType(editorState, blockType));
    focusEditor();
  }

  const _toggleInlineStyle = (inlineStyle: any) =>  {
    console.log("inlinestyle", inlineStyle);
    onChange(
      RichUtils.toggleInlineStyle(editorState, inlineStyle)
    );
    focusEditor();
  }

  // const handleChangeComplete = (color: any) => {
  //   console.log("color is", color);
  //   hexColor = color.hex;
  // };

  // const addColor = (color: any) => {
  //   const newEditorState = styles.color.add(editorState, color);
  //   return updateEditorState(newEditorState, focusEditor);
  // };

  // const addFontSize = (fontSize: any) => {
  //   console.log("add the fontSize", fontSize);
  //   focusEditor();
  //   const newEditorState = styles.fontSize.add(
  //     editorState,
  //     fontSize
  //   );

  //   return updateEditorState(newEditorState);
  // };

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState ? editorState.getCurrentContent() : null;
    if (contentState && !contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
    if (editorState) {
      return (
        <div
          className={"text-editor"}
          style={{
            width: (props.width * 100) / initialWidth + "%",
            height: props.height
          }}
        >
          <div className={"text-editor-style-row"}>
            <InlineStyleControls
              editorState={editorState}
              onToggle={toggleInlineStyle}
              {...props}
            />
            <BlockStyleControls
              editorState={editorState}
              onToggle={toggleBlockType}
              {...props}
            />
            {isInsertLink && (
              <LinkInput
                onClose={() => setIsInsertLink(false)}
              />
            )}
          </div>
          <div className={"text-editor-parent"}>
            <div className={className + " text-editor-area"}>
              <Editor
                ref={editorRef}
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                customStyleFn={customStyleFn}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={onChange}
                onTab={onTab}
                placeholder="Tell a story..."
                spellCheck={props.spellCheck}
              />
            </div>
          </div>
          <div className={"text-editor-bottom-row"}>
            {bottomIcons.map(
              (item, index) =>
                props[item.checkOption] && (
                  <div key={index}>
                    <input
                      type="file"
                      hidden
                      accept={item.fileType}
                      ref={ref => (fileOpener[index] = ref)}
                      onChange={event =>
                        console.log("event is", event.target.files)
                      }
                    />
                    <i
                      className={item.name}
                      key={index}
                      onClick={() => {
                        if (item.type === FILE) {
                          fileOpener[index].click();
                        }
                        else if (item.type === LINK)
                          setIsInsertLink(true)
                      }}
                    />
                  </div>
                )
            )}
            <button
              className={"texteditor-save-button"}
              onClick={() => {
                let js = convertToRaw(
                  editorState.getCurrentContent()
                );
                props.onSave(JSON.stringify(js));
              }}
            >
              Save
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
}

TextEditor.defaultProps = {
  isSpellCheck: false,
  boldOption: true,
  italicOption: true,
  underlineOption: true,
  headerOption: true,
  codeOption: true,
  quoteOption: true,
  unorderedListOption: true,
  orderedListOption: true,
  linkUpload: false,
  imageUpload: false,
  videoUpload: false,
  audioUpload: false,
  fileUpload: false,
  initialData: null,
  onSave: (data: any) => console.log("data to save is", data)
};

export {TextEditor}