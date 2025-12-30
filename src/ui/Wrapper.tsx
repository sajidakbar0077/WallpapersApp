import { View, Text } from 'react-native'
import React from 'react'
import style from '../style/style'
import { IChildren } from '../util/InterFaces'
const Wrapper:React.FC<IChildren> = ({children}) => {
  return (
    <View style={style.bodyWrapper}>
     {children}
    </View>
  )
}

export default Wrapper