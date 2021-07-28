import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {TextEditor} from "./TextEditor";
import {RichText} from "./RichTextRenderer";

ReactDOM.render(<App />, document.getElementById("root"));
export { TextEditor, RichText };
