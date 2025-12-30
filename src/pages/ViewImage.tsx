// import { useRoute } from '@react-navigation/native'
// import { View, Text, Image } from 'react-native'
// import { RouteProp } from '@react-navigation/native'
// import Wrapper from '../ui/Wrapper'
// import style from '../style/style'
// import { useEffect, useState } from 'react'
// import LottieView from 'lottie-react-native'
// const ViewImage = () => {
//   const [aspectRatio, setAspectRatio] = useState(1);
//   const [isLoading, setIsLoading] = useState(true)
//   useEffect(() => {
//     Image.getSize(
//       url,
//       (width, height) => {
//         setAspectRatio(width / height);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }, [])
//   type ParamsList = {
//     viewImage: { url: string }
//   }
//   const route = useRoute<RouteProp<ParamsList>>()
//   const { url } = route.params
//   return (
//     <Wrapper>
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         {isLoading ?
//           <LottieView
//             source={require("../util/loader.json")}
//             style={{ width: 150, height: 150 }}
//             autoPlay
//             loop
//           /> : null}
//         <Image source={{ uri: url }} style={{ width: '100%', aspectRatio, height:isLoading?0:"auto" }} resizeMode='contain' onLoadEnd={() => setIsLoading(false)
//         } onLoad={()=>setIsLoading(false)}/>
//       </View>
//     </Wrapper>
//   )
// }

// export default ViewImage