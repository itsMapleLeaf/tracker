import { css } from "@emotion/core"
import { mdiCheckCircle, mdiPlus, mdiSettings, mdiTrashCan } from "@mdi/js"
import gql from "graphql-tag"
import React from "react"
import { useQuery } from "../apollo/hooks"
import { primaryColor, primaryTextColor } from "../style/colors"
import FlatButton from "../style/FlatButton"
import { flexColumn, flexGrow, flexRow } from "../style/flex"
import { fullHeight, scrollVertical, spacedGrid } from "../style/helpers"
import Icon from "../style/Icon"

const trackedAnimeEntry = css`
  align-items: center;
  background-color: ${primaryColor};
  padding: 0.5rem;
  max-width: 500px;
  margin: 0 auto;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`

function TrackedAnimeEntry() {
  return (
    <article css={[flexRow, trackedAnimeEntry]}>
      <span css={[flexGrow, { padding: "0.5rem" }]}>Cute Anime</span>
      <span css={{ padding: "0.5rem" }}>5 / 6</span>
      <FlatButton>
        <Icon size={1} name={mdiCheckCircle} color={primaryTextColor} />
      </FlatButton>
      <FlatButton>
        <Icon size={1} name={mdiSettings} color={primaryTextColor} />
      </FlatButton>
      <FlatButton>
        <Icon size={1} name={mdiTrashCan} color={primaryTextColor} />
      </FlatButton>
    </article>
  )
}

const pageQuery = gql`
  {
    Page(page: 0, perPage: 20) {
      media(type: ANIME, season: WINTER, seasonYear: 2019) {
        id
        title {
          english
          romaji
        }
        coverImage {
          large
        }
        bannerImage
        genres
        format
      }
    }
  }
`

function App() {
  const { data, isLoading } = useQuery(pageQuery)

  return (
    <main css={[fullHeight]}>
      {isLoading && <p>Loading...</p>}
      {data ? (
        <ul css={[spacedGrid]}>
          {data.Page.media.map((media: any) => (
            <li key={media.id}>
              <AnimeSummaryCard anime={media} />
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}

function SidebarAction(props: { icon: string }) {
  return (
    <FlatButton>
      <Icon size={1.5} name={props.icon} color={primaryTextColor} />
    </FlatButton>
  )
}

function AnimeSummaryCard({ anime }: { anime: { [key: string]: any } }) {
  const container = css`
    height: 200px;
    max-width: 700px;
    margin: 0 auto;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);

    position: relative;

    background-color: ${primaryColor};
  `

  const coverImageStyle = css`
    height: 100%;
    max-height: 200px;
    min-width: 150px;
    object-fit: cover;
  `

  const titleStyle = css`
    font-size: 1.2rem;
  `

  const titleAltStyle = css`
    font-size: 0.8rem;
    opacity: 0.5;
    padding-top: 0.2rem;
    font-style: italic;
  `

  return (
    <article css={[flexRow, container]}>
      <img
        css={coverImageStyle}
        src={anime.coverImage.large}
        role="presentation"
      />
      <div css={[flexGrow, flexColumn]}>
        <div css={[flexGrow, scrollVertical, { padding: "0.5rem" }]}>
          <h3 css={titleStyle}>{anime.title.romaji}</h3>
          <p css={titleAltStyle}>{anime.title.english}</p>
          <p css={titleAltStyle}>{anime.format}</p>
          <p css={titleAltStyle}>{anime.genres.join(", ")}</p>
        </div>
        <FlatButton>
          <Icon name={mdiPlus} size={1} />
        </FlatButton>
      </div>
    </article>
  )
}

export default App
