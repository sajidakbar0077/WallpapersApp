import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import style from '../style/style'
import Wrapper from '../ui/Wrapper'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
const SignUp = () => {
  const navigate=useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const[focus,setFocus]=useState(false)
  function signup(){
    navigate.navigate("layout")
  }
  return (
    <>
      <Header title={"Sign Up"} />
      <Wrapper>
        <View style={style.formWrapper}>
          <View style={style.form}>
            <Text style={style.mainTitle}>SIGN UP</Text>
            <View style={style.input}>
              <TextInput placeholder='Enter Your Name' />
            </View>
            <View style={style.input}>
              <TextInput placeholder='Enter Your Email' />
            </View>
            <View style={style.input}>
              <TextInput placeholder='Enter Your password' secureTextEntry={true} autoCapitalize="none"
                autoCorrect={false} />
            </View>

            <Pressable style={[style.signBtn,focus&&{backgroundColor:"black"}]} onPressIn={()=>setFocus(true)} onPressOut={()=>setFocus(false)} onPress={signup}>
              <Text style={style.signBtnText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </Wrapper>
    </>
  )
}

export default SignUp