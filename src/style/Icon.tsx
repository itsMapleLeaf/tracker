import MdiIcon from "@mdi/react"
import { primaryTextColor } from "./colors"

type IconProps = {
  name: string
  size?: number
  color?: string
}

function Icon({ name: icon, ...props }: IconProps) {
  return <MdiIcon size={1} color={primaryTextColor} path={icon} {...props} />
}

export default Icon
