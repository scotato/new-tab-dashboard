import React from 'react'
import { createGlobalStyle } from 'styled-components'
import moment from 'moment'

import { SECONDSPERMINUTE, SECONDSPERHOUR, SECONDSPERDAY } from './Time'

export const GRADIENTOFFSET = 30
export const GRADIENTROTATION = 60
export const HUEMIN = 0
export const HUEMAX = 360
export const SATURATIONMIN = 75
export const SATURATIONMAX = 85
export const LIGHTNESSMIN = 10
export const LIGHTNESSMAX = 50

export const gradient = hsl => `linear-gradient(
  ${hsl.hue}deg, 
  ${hslString({
    hue: hsl.hue + GRADIENTOFFSET,
    saturation: hsl.saturation,
    lightness: hsl.lightness
  })}, 
  ${hslString({
    hue: hsl.hue + GRADIENTOFFSET + GRADIENTROTATION,
    saturation: hsl.saturation,
    lightness: hsl.lightness
  })})
`

export const hslString = ({ hue, saturation, lightness}) => `hsl(${hue}, ${saturation}%, ${lightness}%)`

const getHSL = timestamp => {
  const date = moment(timestamp)
  const dateSeconds = date.seconds() + (date.minutes() * SECONDSPERMINUTE) + (date.hours() * SECONDSPERHOUR)
  
  // const secondsPerMinutePortion = date.seconds() / SECONDSPERMINUTE
  // const secondsPerHourPortion = (date.seconds() + (date.minutes() * SECONDSPERMINUTE)) / SECONDSPERHOUR
  const secondsPerDayPortion = dateSeconds / SECONDSPERDAY
  const saturationPortion = 1 - (2 * (Math.abs(12 * SECONDSPERHOUR - dateSeconds)) / SECONDSPERDAY)
  const lightnessPortion = 1 - (2 * (Math.abs(12 * SECONDSPERHOUR - dateSeconds)) / SECONDSPERDAY)
  
  const hue = (secondsPerDayPortion * (HUEMAX - HUEMIN)) + HUEMIN
  const saturation = (saturationPortion * (SATURATIONMAX - SATURATIONMIN)) + SATURATIONMIN // highest saturation at 12
  const lightness = (lightnessPortion * (LIGHTNESSMAX - LIGHTNESSMIN)) + LIGHTNESSMIN // highest lightness at 12
  
  return { hue, saturation, lightness }
}

const GlobalStyle = createGlobalStyle`
  html, body {
    background: ${props => gradient(props.hsl)};
  }
`

export default ({ timestamp, children }) => {
  const hsl = getHSL(timestamp)

  return children ? (
    <>
      <GlobalStyle hsl={hsl} />
      {children(hsl)}
    </>
  ) : <GlobalStyle hsl={hsl} />
}