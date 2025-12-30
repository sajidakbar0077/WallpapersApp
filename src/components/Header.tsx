import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from '../style/style'
import Icon from "react-native-vector-icons/FontAwesome6"
type Title={
    title:String
}
const Header:React.FC<Title> = ({title}) => {
  return (
    <View style={style.header}>
     <TouchableOpacity>
     <Icon name="chevron-left" size={25} style={style.backArrow}/>
     </TouchableOpacity>
     <Text style={style.headerText}>{title}</Text>
    </View>
  )
}

export default Header