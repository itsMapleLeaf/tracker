import { Global } from "@emotion/core"
import React from "react"
import ReactDOM from "react-dom"
import ApolloClientContext from "./apollo/ApolloClientContext"
import client from "./apollo/client"
import App from "./app/App"
import globalStyle from "./style/globalStyle"

function renderApp() {
  ReactDOM.render(
    <ApolloClientContext.Provider value={client}>
      <App />
      <Global styles={globalStyle} />
    </ApolloClientContext.Provider>,
    document.getElementById("root"),
  )
}

renderApp()
if (module.hot) {
  module.hot.accept(renderApp)
}
