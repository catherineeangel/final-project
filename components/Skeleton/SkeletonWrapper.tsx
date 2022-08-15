import { FC } from 'react'
import { SkeletonTheme, SkeletonThemeProps } from 'react-loading-skeleton'

export const SkeletonWrapper: FC<SkeletonThemeProps> = ({
  baseColor = '#2D2F45',
  highlightColor = '#3E405B',
  children,
  ...props
}) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor} {...props}>
      {children}
    </SkeletonTheme>
  )
}
