import { hsl, shade } from "polished"

const navy = "rgb(39, 60, 117)"
const white = "rgb(245, 246, 250)"

export const primaryColor = hsl(0, 0, 0.2)
export const primaryAltColor = shade(0.15, primaryColor)
export const primaryTextColor = white
export const primaryBackgroundColor = shade(0.3, primaryColor)
