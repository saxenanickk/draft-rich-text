### Installation

install the package as per the description below
`yarn add https://github.com/saxenanickk/draft-rich-text.git` or `npm i https://github.com/saxenanickk/draft-rich-text.git`

### Usage Example

```
import React, { Component } from "react";
import {TextEditor} from "rich-text";
class App extends Component {
  render() {
    return (
      <TextEditor
        linkUpload={false}
        onSave={data => console.log("Data: ", data)}
      />
    );
  }
}
```

### Usage Example

```

import React, { Component } from "react";
import {RichText} from "rich-text";

const data = '{"blocks":[{"key":"pqa3","text":"1","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"87ajs","text":"2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

class App extends Component {
  render() {
    return (
      <RichText initialData={data} />
    )
  }
}

```

## Props

| Prop                  | Type    | Default | Note                                               |
| --------------------- | ------- | ------- | -------------------------------------------------- |
| `width`               | Number  | 900px   | custom width provided to the text editor           |
| `isSpellCheck`        | Boolean | false   | allows spell check in the editor                   |
| `boldOption`          | Boolean | true    | either give this option to the user or not         |
| `italicOption`        | Boolean | true    | either give this option to the user or not         |
| `underlineOption`     | Boolean | true    | either give this option to the user or not         |
| `headerOption`        | Boolean | true    | either give this option to the user or not         |
| `codeOption`          | Boolean | true    | either give this option to the user or not         |
| `quoteOption`         | Boolean | true    | either give this option to the user or not         |
| `unorderedListOption` | Boolean | true    | either give this option to the user or not         |
| `orderedListOption`   | Boolean | true    | either give this option to the user or not         |
| `linkUpload`          | Boolean | true    | either give this option to the user or not         |
| `imageUpload`         | Boolean | true    | either give this option to the user or not         |
| `videoUpload`         | Boolean | true    | either give this option to the user or not         |
| `audioUpload`         | Boolean | true    | either give this option to the user or not         |
| `fileUpload`          | Boolean | true    | either give this option to the user or not         |
| `onSave`              | String  |         | return a string can be used to store at the server |

```

```
