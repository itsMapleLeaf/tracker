import { css } from "@emotion/core"
import { Link, LinkGetProps, LinkProps } from "@reach/router"

export default function NavLink(props: LinkProps<{}>) {
  return <Link css={navLinkStyle} getProps={getProps} {...props} />
}

const navLinkStyle = css`
  padding: 1rem;
  display: inline-block;
`

const getProps = ({ isCurrent }: LinkGetProps): LinkProps<{}> => ({
  style: { opacity: isCurrent ? 1 : 0.5 },
})
