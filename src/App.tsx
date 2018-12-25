import { css } from "@emotion/core"
import { mdiCheckCircle, mdiSettings } from "@mdi/js"
import Icon from "@mdi/react"
import React from "react"
import {
  primaryBackgroundColor,
  primaryColor,
  primaryTextColor,
} from "./colors"

const flexRow = css`
  display: flex;
  flex-flow: row;
`

const flexColumn = css`
  display: flex;
  flex-flow: column;
`

const flexGrow = css`
  flex: 1;
`

const fullHeight = css`
  height: 100vh;
`

const spacedGrid = css`
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
`

const flatButtonStyle = css`
  padding: 0.5rem;
  opacity: 0.5;
  transition: 0.2s;

  :focus,
  :hover {
    outline: none;
    opacity: 1;
  }

  :active {
    transform: translateY(2px);
    transition: none;
  }
`
const pageBodyStyle = css`
  background: ${primaryBackgroundColor};
  overflow-y: auto;
`
const animeListItem = css`
  align-items: center;
  background-color: ${primaryColor};
  padding: 0.5rem;
  max-width: 500px;
  margin: 0 auto;
`

function SidebarAction() {
  return (
    <button css={flatButtonStyle}>
      <Icon size={1.5} path={mdiSettings} color={primaryTextColor} />
    </button>
  )
}

function TrackedAnimeEntry() {
  return (
    <article css={[flexRow, animeListItem]}>
      <span
        css={[
          flexGrow,
          css`
            padding: 0.5rem;
          `,
        ]}
      >
        Cute Anime
      </span>
      <span
        css={css`
          padding: 0.5rem;
        `}
      >
        5 / 6
      </span>
      <button css={flatButtonStyle}>
        <Icon size={1} path={mdiCheckCircle} color={primaryTextColor} />
      </button>
      <button css={flatButtonStyle}>
        <Icon size={1} path={mdiSettings} color={primaryTextColor} />
      </button>
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
