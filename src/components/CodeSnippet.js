import React, { Component } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

function codeboxContent(userText) {
  if (userText) {
    return (
      `Auth.currentSession()
      .then((data) => {
        console.log(data);
        const name = data.accessToken.payload.username;
        const callback = (successData, error) => {
          if (error) {
            console.log(error);
          } else {
            ${userText} // this is an example of a user column going in the codebox
          }
        };
        getUser(callback, name);
      });`);
  } else {
    return (
      `texty
      text
      text`
    );
  }
}

class CodeSnippet extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <CopyBlock
        text={codeboxContent(this.props.content)}
        language={this.props.language}
        showLineNumbers
        theme={dracula}
        codeBlock
      />
    );
  }
}
export default CodeSnippet;
