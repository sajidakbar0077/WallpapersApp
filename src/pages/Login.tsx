import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import style from '../style/style'
import Wrapper from '../ui/Wrapper'
import Header from '../components/Header'

const Login = () => {
    const[focus,setFocus]=useState(false)
    return (
        <>
            <Header title={"Login"} />
            <Wrapper>
                <View style={style.formWrapper}>
                    <View style={style.form}>
                        <Text style={style.mainTitle}>LOGIN</Text>
                        <View style={style.input}>
                            <TextInput placeholder='Enter Your Email' />
                        </View>
                        <View style={style.input}>
                            <TextInput placeholder='Enter Your password' secureTextEntry={true} autoCapitalize="none"
                                autoCorrect={false} />
                        </View>

                        <Pressable style={[style.signBtn,focus&&{backgroundColor:"black"}]} onPressIn={()=>setFocus(true)} onPressOut={()=>setFocus(false)}>
              <Text style={style.signBtnText}>Login</Text>
            </Pressable>
                    </View>
                </View>
            </Wrapper>
        </>
    )
}

export default Login