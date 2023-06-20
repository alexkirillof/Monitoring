import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
export const AuthSvg = (props) => (
  <Svg width={30} height={30} viewBox="0 0 30 30">
    <Path
      fill={props.color}
      d="M8 6a4 4 0 0 1 4-4h5.5A4.5 4.5 0 0 1 22 6.5v11a4.5 4.5 0 0 1-4.5 4.5H12a4 4 0 0 1-4-4v-1a1 1 0 1 1 2 0v1a2 2 0 0 0 2 2h5.5a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 17.5 4H12a2 2 0 0 0-2 2v1a1 1 0 0 1-2 0V6Zm4.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L13.586 13H5a1 1 0 1 1 0-2h8.586l-1.293-1.293a1 1 0 0 1 0-1.414Z"
    />
  </Svg>
)

