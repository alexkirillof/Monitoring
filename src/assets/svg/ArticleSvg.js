import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
export const ArticleSvg = (props) => (
  <Svg width={30} height={30} viewBox="0 0 30 30">
    <Path
      stroke={props.color}
      strokeWidth={2}
      d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7Z"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 16V8m0 0 4 4m-4-4-4 4"
    />
  </Svg>
)

