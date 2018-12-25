import { Global } from "@emotion/core"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import globalStyle from "./globalStyle"

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
