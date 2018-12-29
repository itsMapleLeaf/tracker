import { css } from "@emotion/core"
import { mdiCheckCircle, mdiPlus, mdiSettings, mdiTrashCan } from "@mdi/js"
import gql from "graphql-tag"
import idx from "idx"
import React, { useEffect, useState } from "react"
import { useClient } from "../apollo/hooks"
import { UpcomingAnimeQuery } from "../generated/graphql"
import { primaryColor, primaryTextColor } from "../style/colors"
import FlatButton from "../style/FlatButton"
import { flexGrow, flexRow } from "../style/flex"
import {
  anchorBottom,
  coveredBackgroundImage,
  fillArea,
  fullHeight,
  shadeBg,
  spacedGrid,
} from "../style/helpers"
import Icon from "../style/Icon"

export default function App() {
  return <UpcomingAnimePage />
}

function UpcomingAnimePage() {
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
      query: upcomingAnimeQuery,
      variables: { page: prevPageNum + 1 },
    })

    const pageData = result.data.Page
    if (!pageData) return

    setPages([...pages, pageData])
  }

  useEffect(() => {
    loadMediaItems()
  }, [])

  const animeCardListStyle = css`
    grid-template-columns: repeat(auto-fill, 250px);
    grid-auto-rows: 450px;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  `

  return (
    <main css={[fullHeight]}>
      <ul css={[spacedGrid, animeCardListStyle]}>
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

const upcomingAnimeQuery = gql`
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

const trackedAnimeEntry = css`
  align-items: center;
  background-color: ${primaryColor};
  padding: 0.5rem;
  max-width: 500px;
  margin: 0 auto;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`

function AnimeSummaryCard({ media }: { media: UpcomingAnimeQuery.Media }) {
  const coverImage = idx(media, (_) => _.coverImage.large)
  const title = idx(media, (_) => _.title.romaji) || "(unknown title)"
  const titleAlt = idx(media, (_) => _.title.english) || title
  const genres = media.genres || []
  const format = media.format

  const container = css`
    width: 100%;
    height: 100%;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);

    position: relative;

    background-color: ${primaryColor};
    ${coverImage && coveredBackgroundImage(coverImage)};
  `

  const infoContainerStyle = css`
    padding: 0.75rem;
  `

  const titleStyle = css`
    font-size: 1.3rem;
  `

  const infoLineStyle = css`
    font-size: 0.8rem;
    opacity: 0.75;
    margin-top: 0.3rem;
    font-style: italic;
  `

  return (
    <div css={container}>
      <div css={[fillArea]} />

      <div css={[flexRow, anchorBottom, shadeBg]}>
        <div css={[infoContainerStyle, flexGrow]}>
          <h3 css={titleStyle}>{title}</h3>

          {titleAlt !== title && <div css={infoLineStyle}>{titleAlt}</div>}

          <div css={infoLineStyle}>
            {[format, genres.join(", ")].filter(Boolean).join(" - ")}
          </div>
        </div>

        <div css={{ alignSelf: "flex-end" }}>
          <FlatButton>
            <Icon name={mdiPlus} />
          </FlatButton>
        </div>
      </div>
    </div>
  )
}

function TrackedAnimeEntry() {
  return (
    <div css={[flexRow, trackedAnimeEntry]}>
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
    </div>
  )
}
