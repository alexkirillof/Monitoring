import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"
export const ListSvg = (props) => (
  <Svg width={30} height={30} viewBox="0 0 30 30">
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M12 12h3M12 16h3"

    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"

    />
    <Circle cx={9} cy={12} r={1} fill={props.color} />
    <Circle cx={9} cy={16} r={1} fill={props.color} />
  </Svg>
)

