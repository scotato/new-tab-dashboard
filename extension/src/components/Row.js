import React from 'react'
import styled, { css } from 'styled-components'
import Link from './Link'
import Icon from './Icon'

export const rowStyle = css`
  display: grid;
  position: relative;
  margin-bottom: 16px;
  padding: 16px;
  background-color: ${props => props.theme.color.default};
  border-radius: 20px;
  grid-template-areas: "badge title detail";
  grid-template-columns: 32px 1fr auto;
  grid-column-gap: 12px;
  line-height: 32px;
  align-items: center;

  .dark-mode & {
    background-color: hsl(0, 0%, 20%);
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const Row = styled.div`
  ${rowStyle}
`

const LinkRow = styled(Link)`
  ${rowStyle}
  grid-template-areas: "badge title detail arrow";
  grid-template-columns: 32px auto auto 20px;
  color: inherit;

  &:hover {
    color: inherit;
  }

  &:focus svg {
    color: ${props => props.theme.color.info};
  }
`

export const Badge = styled(Icon)`
  grid-area: badge;
  justify-self: center;
  color: hsl(0, 0%, 70%);
  transform: scale(1.25);
  z-index: 1;

  .dark-mode & {
    color: hsl(0, 0%, 30%);
  }
`

export const Title = styled.span`
  grid-area: title;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  z-index: 1.1;
`

export const Detail = styled.span`
  grid-area: detail;
  text-align: right;
  color: hsl(0, 0%, 50%);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.1;
  max-height: 32px;
  z-index: 1;
`

const Arrow = styled(Icon).attrs({
  name: props => props.external ? 'external-link-alt' : 'chevron-right',
  size: 600
})`
  margin: auto 0;
  grid-area: arrow;
  color: hsl(0, 0%, 40%);
`

export default props => {
  if (props.hidden) return null

  return props.to ? (
    <LinkRow to={props.to}>
      <Badge name={props.icon} />
      <Title>{props.title}</Title>
      <Detail>{props.detail}</Detail>
      <Arrow external={props.to.includes('http')} />
    </LinkRow>
  ) : (
    <Row>
      <Badge name={props.icon} />
      <Title>{props.title}</Title>
      <Detail>{props.detail}</Detail>
    </Row>
  )
}
