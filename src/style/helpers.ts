import { css } from "@emotion/core"
import { semiBlack } from "./colors"

export const fullHeight = css`
  height: 100vh;
`

export const spacedGrid = css`
  display: grid;
  grid-gap: 2rem;
  padding: 1rem;
`

export const scrollVertical = css`
  overflow-y: auto;
  transform: translateZ(0);
`

export const fillArea = css`
  width: 100%;
  height: 100%;
  position: absolute;
`

export const coveredBackgroundImage = (url?: string) => css`
  background-image: url(${url});
  background-size: cover;
  background-position: center;
`

export const shadeBg = css`
  background-color: ${semiBlack(0.75)};
`

export const anchorBottom = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`
