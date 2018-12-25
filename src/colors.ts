import { shade } from "polished"

const navy = "rgb(39, 60, 117)"
const white = "rgb(245, 246, 250)"

export const primaryColor = navy
export const primaryAltColor = shade(0.15, navy)
export const primaryTextColor = white
export const primaryBackgroundColor = shade(0.3, primaryColor)
