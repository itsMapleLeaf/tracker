import { css, Global } from "@emotion/core"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { primaryColor, primaryTextColor } from "./colors"

const globalStyle = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    word-break: break-word;
  }

  :root {
    font: 16px Roboto;
    background: ${primaryColor};
    color: ${primaryTextColor};
  }

  button,
  input,
  textarea,
  select,
  option {
    background: none;
    border: 0;
    font: inherit;
  }

  ul {
    list-style: none;
  }

  img,
  svg {
    vertical-align: bottom;
  }
`

function renderApp() {
  ReactDOM.render(
    <>
      <App />
      <Global styles={globalStyle} />
    </>,
    document.getElementById("root"),
  )
}

renderApp()
if (module.hot) {
  module.hot.accept(renderApp)
}
