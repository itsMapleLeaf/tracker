import { css } from "@emotion/core"
import { mdiCheckCircle, mdiPlus, mdiSettings, mdiTrashCan } from "@mdi/js"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useClient } from "../apollo/hooks"
import { UpcomingAnimeQuery } from "../generated/graphql"
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
  query UpcomingAnimeQuery($page: Int!) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        currentPage
        hasNextPage
      }
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
  const client = useClient()
  const [pages, setPages] = useState<UpcomingAnimeQuery.Page[]>([])

  async function loadMediaItems() {
    const prevPage = pages[pages.length - 1]
    if (prevPage && !prevPage.pageInfo!.hasNextPage) return

    const prevPageNum = (prevPage && prevPage.pageInfo!.currentPage) || -1

    const result = await client.query<
      UpcomingAnimeQuery.Query,
      UpcomingAnimeQuery.Variables
    >({
      query: pageQuery,
      variables: { page: prevPageNum + 1 },
    })

    const pageData = result.data.Page
    if (!pageData) return

    setPages([...pages, pageData])
  }

  useEffect(() => {
    loadMediaItems()
  }, [])

  return (
    <main css={[fullHeight]}>
      <ul css={spacedGrid}>
        {pages.map((page) =>
          page.media!.map((media) => (
            <li key={media!.id}>
              <AnimeSummaryCard media={media!} />
            </li>
          )),
        )}
      </ul>

      <button onClick={loadMediaItems}>load more</button>
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

function AnimeSummaryCard({ media }: { media: UpcomingAnimeQuery.Media }) {
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

  const title = (media.title && media.title.romaji) || "(unknown title)"
  const titleAlt = (media.title && media.title.english) || title

  return (
    <article css={[flexRow, container]}>
      <img
        css={coverImageStyle}
        src={media.coverImage!.large!}
        role="presentation"
      />
      <div css={[flexGrow, flexColumn]}>
        <div css={[flexGrow, scrollVertical, { padding: "0.5rem" }]}>
          <h3 css={titleStyle}>{title}</h3>
          <p css={titleAltStyle}>{titleAlt}</p>
          <p css={titleAltStyle}>{media.format}</p>
          <p css={titleAltStyle}>{media.genres!.join(", ")}</p>
        </div>
        <FlatButton>
          <Icon name={mdiPlus} size={1} />
        </FlatButton>
      </div>
    </article>
  )
}

export default App
