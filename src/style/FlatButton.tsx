import { css } from "@emotion/core"
import React from "react"

function FlatButton(props: React.ComponentPropsWithoutRef<"button">) {
  return <button css={flatButtonStyle} {...props} />
}
export default FlatButton

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
