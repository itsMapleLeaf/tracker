import { shade } from "polished"

const softBlue = "rgb(39, 60, 117)"
const white = "rgb(245, 246, 250)"

export const primaryColor = softBlue
export const primaryAltColor = shade(0.15, primaryColor)
export const primaryTextColor = white
export const primaryBackgroundColor = shade(0.3, primaryColor)

export const semiBlack = (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`
