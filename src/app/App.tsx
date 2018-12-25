import { css } from "@emotion/core"
import { mdiCheckCircle, mdiSettings } from "@mdi/js"
import Icon from "@mdi/react"
import React from "react"
import {
  primaryBackgroundColor,
  primaryColor,
  primaryTextColor,
} from "../style/colors"
import { FlatButton } from "../style/FlatButton"
import { flexColumn, flexGrow, flexRow } from "../style/flex"
import { fullHeight, spacedGrid } from "../style/helpers"

const pageBodyStyle = css`
  background: ${primaryBackgroundColor};
  overflow-y: auto;
`

const trackedAnimeEntry = css`
  align-items: center;
  background-color: ${primaryColor};
  padding: 0.5rem;
  max-width: 500px;
  margin: 0 auto;
`

function SidebarAction() {
  return (
    <FlatButton>
      <Icon size={1.5} path={mdiSettings} color={primaryTextColor} />
    </FlatButton>
  )
}

function TrackedAnimeEntry() {
  return (
    <article css={[flexRow, trackedAnimeEntry]}>
      <span css={[flexGrow, { padding: "0.5rem" }]}>Cute Anime</span>
      <span css={{ padding: "0.5rem" }}>5 / 6</span>
      <FlatButton>
        <Icon size={1} path={mdiCheckCircle} color={primaryTextColor} />
      </FlatButton>
      <FlatButton>
        <Icon size={1} path={mdiSettings} color={primaryTextColor} />
      </FlatButton>
    </article>
  )
}

function App() {
  return (
    <main css={[flexRow, fullHeight]}>
      <aside css={flexColumn}>
        <SidebarAction />
        <SidebarAction />
        <SidebarAction />
        <SidebarAction />
      </aside>
      <section css={[flexGrow, pageBodyStyle]}>
        <ul css={spacedGrid}>
          {[...Array(30)].map((_, i) => (
            <li key={i}>
              <TrackedAnimeEntry />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
