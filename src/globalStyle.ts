import { css } from "@emotion/core"
import { primaryColor, primaryTextColor } from "./colors"

export default css`
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
